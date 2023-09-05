const WebSocket = require('ws');
const axios = require('axios');
 
const DATAMUSE_API_URL = 'https://api.datamuse.com/words';
 
let client = new WebSocket('wss://hack.chat/chat-ws');
 
let currentWord = '';
let lastLetter = '';
let lastPlayer = '';
 
const playedWords = [];
 
const startingWords = ['apple', 'banana', 'chocolate', 'elephant', 'guitar', 'happiness', 'island', 'jungle', 'koala', 'lemon', 'mountain', 'ocean', 'penguin', 'queen', 'rainbow', 'sunshine', 'tiger', 'umbrella', 'volcano', 'waterfall', 'xylophone', 'zebra'];
 
function chooseStartingWord() {
    return startingWords[Math.floor(Math.random() * startingWords.length)];
}
 
async function isValidWord(word) {
    // Check if the word contains only letters from 'a' to 'z'
    if (!/^[a-zA-Z]+$/.test(word)) {
        return false;
    }
 
    try {
        const response = await axios.get(`${DATAMUSE_API_URL}?sp=${word}&max=1`);
        return response.data.length > 0;
    } catch (error) {
        console.error('Error validating word:', error);
        return false;
    }
}
 
 
function send(data) {
    client.send(JSON.stringify(data));
}
 
client.on('open', function () {
    send({
        cmd: 'join',
        channel: 'games',
        nick: 'wordchain_bot'
    });
    startGame();
});
 
function startGame() {
    currentWord = chooseStartingWord();
    lastLetter = currentWord[currentWord.length - 1];
    playedWords.push(currentWord);
    send({
        cmd: 'chat',
        text: `[Word Chain] Game started! The starting word is "${currentWord}".`
    });
}
 
client.on('message', async function (data) {
    let args = JSON.parse(data);
    if (args.cmd === 'chat') {
        const { nick, text } = args;
        if (text === '!startwordchain') {
            startGame();
        } else if (text === '!endwordchain') {
            send({
                cmd: 'chat',
                text: `[Word Chain] Game ended. Thanks for playing!`
            });
            currentWord = '';
            lastLetter = '';
            lastPlayer = '';
            playedWords.length = 0;
        } else if (text === '.viewwords') {
            const wordsString = playedWords.join(', ');
            send({
                cmd: 'chat',
                text: `[Word Chain] Played words: ${wordsString}`
            });
        } else if (currentWord && text.startsWith('.play')) { 
            if (lastPlayer === nick.toLowerCase()) {
                send({
                    cmd: 'chat',
                    text: `[Word Chain] ${nick}, you cannot play twice in a row.`
                });
                return;
            }
            const newWord = text.substring(6).trim();
            if (await isValidWord(newWord) && newWord.charAt(0).toUpperCase() === lastLetter.toUpperCase()) {
                if (playedWords.includes(newWord.toLowerCase())) {
                    send({
                        cmd: 'chat',
                        text: `[Word Chain] The word "${newWord}" has already been played. Try a different word!`
                    });
                } else {
                    lastPlayer = nick.toLowerCase();
                    currentWord = newWord;
                    lastLetter = newWord[newWord.length - 1];
                    playedWords.push(newWord.toLowerCase());
                    send({
                        cmd: 'chat',
                        text: `[Word Chain] ${nick} played: "${newWord}". Next letter: "${lastLetter}".`
                    });
                }
            } else if (!await isValidWord(newWord)) {
                send({
                    cmd: 'chat',
                    text: `[Word Chain] The word "${newWord}" is not a valid English word. Try again with a valid word!`
                });
            } else {
                send({
                    cmd: 'chat',
                    text: `[Word Chain] The word "${newWord}" does not match the required letter "${lastLetter}". Try again!`
                });
            }
        } else if (text === '.howtoplay') {
            send({
                cmd: 'chat',
                text: `[Word Chain] Welcome to Word Chain, ${nick}! To play, use the command .play followed by a word that starts with the letter "${lastLetter}".`
            });
        } else if (text === '!currentletter') {
            send({
                cmd: 'chat',
                text: `[Word Chain] The current starting letter is "${lastLetter}".`
            });
        }
    } else if (args.cmd === 'onlineAdd') {
        const { nick } = args;
        send({
            cmd: 'chat',
            text: `[Word Chain] Welcome to Word Chain, ${nick}! Type .howtoplay for instructions on how to play.`
        });
        send({
            cmd: 'chat',
            text: `[Word Chain] Available commands: .howtoplay, .viewwords`
        });
    }
});
