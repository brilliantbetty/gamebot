const WebSocket = require('ws');
 
const client = new WebSocket('wss://hack.chat/chat-ws');
 
function send(data) {
    client.send(JSON.stringify(data));
}
 
const races = {};
 
const sentences = [
    "It was the best of times, it was the worst of times.",
    "Call me Ishmael.",
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "Happy families are all alike; every unhappy family is unhappy in its own way.",
    "A screaming comes across the sky.",
    "Someone must have slandered Josef K., he was arrested one morning without having done anything wrong.",
    "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer.",
    "It was a bright cold day in April, and the clocks were striking thirteen.",
    "The sky above the port was the color of television, tuned to a dead channel.",
    "Mother died today. Or maybe yesterday; I can't be sure.",
    "In my younger and more vulnerable years, my father gave me some advice that I've been turning over in my mind ever since.",
    "It was a pleasure to burn.",
    "It was love at first sight.",
    "Ships at a distance have every man's wish on board.",
    "There was a boy called Eustace Clarence Scrubb, and he almost deserved it.",
    "The first place that I can well remember was a large pleasant meadow.",
    "124 was spiteful.",
    "The cold passed reluctantly from the earth, and the retiring fogs revealed an army stretched out on the hills, resting.",
    "In our family, there was no clear line between religion and fly fishing.",
    "When I stepped out into the bright sunlight, from the darkness of the movie house, I had only two things on my mind: Paul Newman and a ride home."
    // Add more appropriate sentences with contractions here
];
 
 
client.on('message', function (data) {
    const args = JSON.parse(data);
 
    if (args.cmd === 'chat') {
        const { text, channel, nick } = args;
 
        if (text === '!startrace') {
            startRace(channel);
        }
 
        if (races[channel] && races[channel].raceInProgress && text === races[channel].sentenceToType) {
            if (!races[channel].completedUsers.includes(nick)) {
                races[channel].completedUsers.push(nick);
 
                const completionTime = (Date.now() - races[channel].startTime) / 1000;
                const wpm = calculateWPM(completionTime, races[channel].sentenceToType);
                send({ cmd: 'chat', text: `${nick}, completed in ${completionTime.toFixed(2)} seconds! WPM: ${wpm}` });
            }
        }
    } else if (args.cmd === 'onlineAdd') {
        const { nick, channel } = args;
        send({ cmd: 'chat', text: `Welcome to ${channel}, ${nick}! To start a typing race, type !startrace.` });
    }
});
 
function startRace(channel) {
    races[channel] = {
        raceInProgress: true,
        sentenceToType: '',
        completedUsers: []
    };
 
    const randomIndex = Math.floor(Math.random() * sentences.length);
    races[channel].sentenceToType = sentences[randomIndex];
 
    send({ cmd: 'chat', text: `A typing race will start in 10 seconds! Get ready!` });
 
    let countdown = 10;
    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            send({ cmd: 'chat', text: `${countdown}...` });
            countdown--;
        } else {
            clearInterval(countdownInterval);
            send({ cmd: 'chat', text: `Type the following sentence:` });
            send({ cmd: 'chat', text: races[channel].sentenceToType });
 
            races[channel].startTime = Date.now();
        }
    }, 1000);
}
 
function calculateWPM(completionTime, sentence) {
    const wordsInSentence = sentence.split(' ').length;
    const wordsPerMinute = (wordsInSentence / (completionTime / 60)).toFixed(2);
    return wordsPerMinute;
}
 
client.on('open', function () {
    send({
        cmd: 'join',
        channel: 'games',
        nick: 'TypeRacerBot'
    });
 
    send({
        cmd: 'chat',
        text: '/color 20201d'
    });
});
