const WebSocket = require('ws');
let client = new WebSocket('wss://hack.chat/chat-ws');
 
const WIDTH = 7;
const HEIGHT = 6;
const EMPTY = '⚫️'; // Changed to black circle
const PLAYER1_PIECE = '🔴';
const PLAYER2_PIECE = '🔵';
const WINNING_COUNT = 4;
 
let board = [];
let currentPlayer = null;
let gameStarted = false;
let player1Nick = '';
let player2Nick = '';
let totalMoves = 0;
let initialDisplaySent = false; // Initialize initialDisplaySent
 
function initializeBoard() {
  board = [];
  for (let i = 0; i < HEIGHT; i++) {
    const row = [];
    for (let j = 0; j < WIDTH; j++) {
      row.push(EMPTY);
    }
    board.push(row);
  }
}
 
function send(data) {
  client.send(JSON.stringify(data));
}
 
function sendWithBoard(data) {
  data.board = board;
  client.send(JSON.stringify(data));
}
 
function displayBoard() {
  let display = '';
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      display += board[i][j] + ' ';
    }
    display += '\n';
  }
  return display;
}
 
function findValidRow(column) {
  const adjustedColumn = column;
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][adjustedColumn] === EMPTY) {
      return i; // Return the row where the piece would land
    }
  }
  return -1; // Return -1 if the column is already full
}
 
function checkWin(playerPiece) {
  // Check for a win in rows
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j <= WIDTH - WINNING_COUNT; j++) {
      let count = 0;
      for (let k = 0; k < WINNING_COUNT; k++) {
        if (board[i][j + k] === playerPiece) {
          count++;
        } else {
          count = 0;
          break;
        }
      }
      if (count === WINNING_COUNT) {
        return true;
      }
    }
  }
 
  // Check for a win in columns
  for (let i = 0; i <= HEIGHT - WINNING_COUNT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      let count = 0;
      for (let k = 0; k < WINNING_COUNT; k++) {
        if (board[i + k][j] === playerPiece) {
          count++;
        } else {
          count = 0;
          break;
        }
      }
      if (count === WINNING_COUNT) {
        return true;
      }
    }
  }
 
  // Check for a win in diagonals (left-to-right)
  for (let i = 0; i <= HEIGHT - WINNING_COUNT; i++) {
    for (let j = 0; j <= WIDTH - WINNING_COUNT; j++) {
      let count = 0;
      for (let k = 0; k < WINNING_COUNT; k++) {
        if (board[i + k][j + k] === playerPiece) {
          count++;
        } else {
          count = 0;
          break;
        }
      }
      if (count === WINNING_COUNT) {
        return true;
      }
    }
  }
 
  // Check for a win in diagonals (right-to-left)
  for (let i = 0; i <= HEIGHT - WINNING_COUNT; i++) {
    for (let j = WINNING_COUNT - 1; j < WIDTH; j++) {
      let count = 0;
      for (let k = 0; k < WINNING_COUNT; k++) {
        if (board[i + k][j - k] === playerPiece) {
          count++;
        } else {
          count = 0;
          break;
        }
      }
      if (count === WINNING_COUNT) {
        return true;
      }
    }
  }
 
  return false;
}
 
function isBoardFull() {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (board[i][j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
}
 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
async function simulateFallingPieces(column, row, piece, callback) {
  const fallingPiece = piece;
  const targetRow = row;
  const frames = Array.from({ length: HEIGHT }, (_, i) => {
    const frame = board.map((row, rowIndex) =>
      row.map((col, colIndex) => (colIndex === column && rowIndex === i ? fallingPiece : col))
    );
    return frame;
  });
 
  const updateMessageWithFrame = (frame) => {
    const display = `${player1Nick} vs. ${player2Nick}\n\n` + displayBoardWithFrame(frame);
    send({ cmd: 'updateMessage', customId: '1', mode: 'overwrite', text: display });
  };
 
  if (!initialDisplaySent) {
    send({ cmd: 'chat', customId: '1', text: `${player1Nick} vs. ${player2Nick}\n\n${currentPlayer === PLAYER1_PIECE ? '🔴' : '🔵'} It's ${currentPlayer === PLAYER1_PIECE ? player1Nick : player2Nick}'s turn.\n\n` });
    initialDisplaySent = true;
  }
 
  let currentRow = 0;
  let prevFrame = null;
  const animationInterval = 1000; // The interval can be adjusted based on the desired animation speed
  for (currentRow = 0; currentRow <= targetRow; currentRow++) {
    prevFrame = frames[currentRow];
    updateMessageWithFrame(prevFrame);
    await delay(animationInterval);
  }
 
  // Update the board with the player's piece in its final position
  board[row][column] = piece;
 
  updateMessageWithFrame(board); // Update with the final frame
  callback();
}
 
function displayBoardWithFrame(frame) {
  let display = '';
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      display += frame[i][j] + ' ';
    }
    display += '\n';
  }
  return display;
}
 
function displayGameStatus() {
  send({ cmd: 'chat', customId: '1', text: `${player1Nick} vs. ${player2Nick}\n\n${currentPlayer === PLAYER1_PIECE ? '🔴' : '🔵'} It's ${currentPlayer === PLAYER1_PIECE ? player1Nick : player2Nick}'s turn.\n\n` });
}
 
function handleChatMessage(args) {
  const nick = args.nick;
  const text = args.text;
  console.log(`${nick}: ${text}`);
 
  if (text.startsWith('betty')) {
    if (text === 'betty /help') {
      send({ cmd: 'chat', text: 'ConnectFourBot: Available commands:\n' +
        '  betty /start [opponentNick] - Start a new game against the specified opponent\n' +
        '  betty /move [column] - Make a move by dropping a piece in the specified column\n' +
        '  betty /board - View the current game board\n' +
        '  betty /reset - Reset the game\n\n' +
        'To make a move, use "betty /move [column]", where [column] is a number between 1 and 7.' });
    } else if (text.startsWith('betty /start ')) {
      if (!gameStarted) {
        const opponentNick = text.slice(12).trim();
        if (opponentNick !== '' && opponentNick !== nick) {
          initializeBoard();
          gameStarted = true;
          currentPlayer = PLAYER1_PIECE;
          player1Nick = nick;
          player2Nick = opponentNick;
 
          // Send the initial empty board state to the player who started the game
          sendBoardToPlayer(nick);
 
          send({ cmd: 'chat', text: `ConnectFourBot: Game started against ${opponentNick}! You can make your move using "betty /move [column]"\n\n` });
        } else {
          send({ cmd: 'chat', text: 'Invalid opponent nickname. Please specify a different opponent.' });
        }
      } else {
        send({ cmd: 'chat', text: 'Game has already started. Please use "betty /move [column]" to continue playing.' });
      }
    } else if (text === 'betty /reset') {
      initializeBoard();
      gameStarted = false;
      currentPlayer = null;
      player1Nick = '';
      player2Nick = '';
      totalMoves = 0;
      initialDisplaySent = false;
      send({ cmd: 'chat', text: 'ConnectFourBot: Game has been reset. Use "betty /start [opponentNick]" to start a new game against the specified opponent.' });
    } else if (text === 'betty /board') {
      send({ cmd: 'chat', text: `ConnectFourBot: Current game board:\n\n${displayBoard()}` });
    } else if (text.startsWith('betty /move ')) {
      if (gameStarted) {
        if (currentPlayer === PLAYER1_PIECE && nick === player1Nick || currentPlayer === PLAYER2_PIECE && nick === player2Nick) {
          const column = parseInt(text.slice(11));
          if (!isNaN(column) && column >= 1 && column <= WIDTH) {
            const currentPlayerPiece = currentPlayer;
            const adjustedColumn = column - 1;
            const row = findValidRow(adjustedColumn);
            if (row !== -1) {
              // The move is valid, and row contains the row where the piece would land
              // Perform any necessary actions based on the move, and then update the board accordingly.
              simulateFallingPieces(adjustedColumn, row, currentPlayerPiece, () => {
                board[row][adjustedColumn] = currentPlayerPiece;
                if (checkWin(currentPlayerPiece)) {
                  sendWithBoard({ cmd: 'chat', text: `Congratulations, ${nick}! You won!\n\n` });
                  gameStarted = false;
                  currentPlayer = null;
                  player1Nick = '';
                  player2Nick = '';
                  totalMoves = 0;
                  initialDisplaySent = false;
                } else if (isBoardFull()) {
                  sendWithBoard({ cmd: 'chat', text: `It's a draw! Let's play again.\n\n` });
                  gameStarted = false;
                  currentPlayer = null;
                  player1Nick = '';
                  player2Nick = '';
                  totalMoves = 0;
                  initialDisplaySent = false;
                } else {
                  currentPlayer = currentPlayer === PLAYER1_PIECE ? PLAYER2_PIECE : PLAYER1_PIECE;
                  totalMoves++;
                  displayGameStatus();
                }
              });
            } else {
              send({ cmd: 'chat', text: 'Invalid move. Please choose another column.' });
            }
          } else {
            send({ cmd: 'chat', text: 'Invalid move format. Please use "betty /move [column]" to play.' });
          }
        } else {
          send({ cmd: 'chat', text: "It's not your turn to make a move." });
        }
      } else {
        send({ cmd: 'chat', text: 'Game has not started. Please use "betty /start [opponentNick]" to start the game.' });
      }
    }
  }
}
 
function sendBoardToPlayer(nick) {
  const display = `ConnectFourBot: The game has started!\n\n${displayBoard()}`;
  send({ cmd: 'chat', nick: nick, text: display });
}
 
client.on('open', function () {
  console.log('Client connected');
  send({ cmd: 'join', channel: 'programming', nick: 'ConnectFourBot' });
  initializeBoard();
 
  // Send a message to greet users and inform them about the available commands
  send({ cmd: 'chat', text: 'ConnectFourBot has joined the chat!\n' +
    'Use "betty /help" to see the available commands and start a new game.\n' });
});
 
client.on('message', function (data) {
  console.log('Received message:', data);
  let args = JSON.parse(data);
  if (args.cmd === 'chat') {
    handleChatMessage(args);
  } else if (args.cmd === 'onlineAdd') {
    const newlyJoinedUser = args.nick;
    console.log('User joined:', newlyJoinedUser);
  }
});
 
client.on('close', function (code, reason) {
  console.log('Connection closed:', code, reason);
});
 
client.on('error', function (error) {
  console.error('WebSocket error:', error);
});
