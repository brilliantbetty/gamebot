const WebSocket = require('ws');
 
let client = new WebSocket('wss://hack.chat/chat-ws');
 
function send(data) {
    client.send(JSON.stringify(data));
}
 
client.on('open', function () {
    send({
        cmd: 'join',
        channel: 'games',
        nick: 'cardy'
    });
});
 
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = generateDeck();
let hands = {};
 
const shorthandMap = {
    'HA': '♥A', 'H2': '♥2', 'H3': '♥3', 'H4': '♥4', 'H5': '♥5',
    'H6': '♥6', 'H7': '♥7', 'H8': '♥8', 'H9': '♥9', 'H10': '♥10',
    'HJ': '♥J', 'HQ': '♥Q', 'HK': '♥K',
    'SA': '♠A', 'S2': '♠2', 'S3': '♠3', 'S4': '♠4', 'S5': '♠5',
    'S6': '♠6', 'S7': '♠7', 'S8': '♠8', 'S9': '♠9', 'S10': '♠10',
    'SJ': '♠J', 'SQ': '♠Q', 'SK': '♠K',
    'DA': '♦A', 'D2': '♦2', 'D3': '♦3', 'D4': '♦4', 'D5': '♦5',
    'D6': '♦6', 'D7': '♦7', 'D8': '♦8', 'D9': '♦9', 'D10': '♦10',
    'DJ': '♦J', 'DQ': '♦Q', 'DK': '♦K',
    'CA': '♣A', 'C2': '♣2', 'C3': '♣3', 'C4': '♣4', 'C5': '♣5',
    'C6': '♣6', 'C7': '♣7', 'C8': '♣8', 'C9': '♣9', 'C10': '♣10',
    'CJ': '♣J', 'CQ': '♣Q', 'CK': '♣K'
};
 
client.on('message', function (data) {
    let args = JSON.parse(data);
 
    if (args.cmd === 'onlineAdd') {
        send({
            cmd: 'whisper',
            nick: args.nick,
            text: `Welcome to the card chat, ${args.nick}! I'm Cardy, the card bot.\nUse "@draw [num]" to draw cards from the deck.\nUse "@play [card]" to play a card from your hand.\nYou can use shorthand notations like "HA" or "♥A" for Ace of Hearts.\nUse "@shuffle" to reshuffle the deck.\nUse "@check" to check your hand.`
        });
    }
 
 
    if (args.cmd === 'chat' && args.text.startsWith('@draw')) {
        const [, cardsToDraw] = args.text.split(' ');
        const drawnCards = drawCards(args.nick, parseInt(cardsToDraw));
        if (drawnCards.length > 0) {
            const drawnCardsFormatted = drawnCards.map(card => formatCardWithColor(card));
            send({
                cmd: 'whisper',
                nick: args.nick,
                text: `You drew ${cardsToDraw} card(s): ${drawnCardsFormatted.join(', ')}`
            });
        }
    } else if (args.cmd === 'chat' && args.text.startsWith('@play')) {
        const [, cardToPlay] = args.text.split(' ');
        const formattedCard = getFormattedCard(cardToPlay.toUpperCase()); // Convert to uppercase
        if (formattedCard) {
            playCard(args.nick, formattedCard);
        } else {
            send({
                cmd: 'chat',
 
                text: `${args.nick}, invalid card shorthand.`
            });
        }
    } else if (args.cmd === 'chat' && args.text === '@shuffle') {
        shuffleDeck();
        send({
            cmd: 'chat',
            text: `Deck reshuffled with 52 cards.`
        });
    } else if (args.cmd === 'chat' && args.text === '@check') {
        checkHand(args.nick);
    }
});
 
// ... (rest of the code remains the same)
 
 
function generateDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(suit + rank);
        }
    }
    return deck;
}
 
function drawCards(nick, numCards) {
    if (numCards > deck.length) {
        send({
            cmd: 'whisper',
            nick: nick,
            text: `Not enough cards in the deck to draw ${numCards} card(s).`
        });
        return [];
    }
 
    const drawnCards = [];
    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const drawnCard = deck.splice(randomIndex, 1)[0];
        drawnCards.push(drawnCard);
    }
    if (!hands[nick]) {
        hands[nick] = [];
    }
    hands[nick] = hands[nick].concat(drawnCards);
    return drawnCards;
}
 
function playCard(nick, cardToPlay) {
    const playerHand = hands[nick];
    if (!playerHand || !playerHand.includes(cardToPlay)) {
        send({
            cmd: 'chat',
 
            text: `${nick}, you cannot play a card you don't have.`
        });
    } else {
        hands[nick] = playerHand.filter(card => card !== cardToPlay);
        send({
            cmd: 'chat',
 
            text: `${nick} played a card: ${formatCardWithColor(cardToPlay)}`
        });
    }
}
 
function checkHand(nick) {
    const playerHand = hands[nick];
    if (!playerHand || playerHand.length === 0) {
        send({
            cmd: 'whisper',
            nick: nick,
            text: `${nick}, your hand is empty.`
        });
    } else {
        const playerHandFormatted = playerHand.map(card => formatCardWithColor(card));
        send({
            cmd: 'whisper',
            nick: nick,
            text: `${nick}'s hand: ${playerHandFormatted.join(', ')}`
        });
    }
}
 
function formatCardWithColor(card) {
    const suit = card.substring(0, 1);
    const number = card.substring(1);
 
    const suitSymbol = {
        '♠': '♠',
        '♥': '♥',
        '♦': '♦',
        '♣': '♣'
    }[suit];
 
    const colorCommand = {
        '♠': '$\\blue',
        '♥': '$\\red',
        '♦': '$\\orange',
        '♣': '$\\green'
    }[suit];
 
    return `${colorCommand}{${suitSymbol}}$${number}`;
}
 
function shuffleDeck() {
    deck = generateDeck();
    hands = {};
}
 
function getFormattedCard(cardInput) {
    const input = cardInput.toUpperCase();
    for (const shorthand in shorthandMap) {
        if (input === shorthand || input === shorthandMap[shorthand]) {
            return shorthandMap[shorthand];
        }
    }
    return null;
}
