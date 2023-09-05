const WebSocket = require('ws');
 
let client = new WebSocket('wss://hack.chat/chat-ws');
 
function send(data) {
    client.send(JSON.stringify(data));
}
 
client.on('open', function () {
    send({
        cmd: 'join',
        channel: 'games',
        nick: 'bottom'
    });
 
 
});
 
let jokeIndex = 0;
 
client.on('message', function (data) {
    let args = JSON.parse(data);
 
    if (args.cmd === 'chat') {
        const { nick, text } = args;
        if (text === '~joke') {
            tellJoke();
        }
    }
 
    if (args.cmd === 'onlineAdd') {
        const { nick } = args;
        sendWelcomeMessage(nick);
    }
});
 
function sendWelcomeMessage(nick) {
    const welcomeMessage = `Welcome to the chat, ${nick}! To hear a joke, simply type ~joke.`;
    send({
        cmd: 'chat',
        text: welcomeMessage
    });
}
 
function tellJoke() {
    const bottomJokes = [
 
        "What did one cheek say to the other cheek? Between you and me, we crack some great jokes!",
        "Why did the bot go to the beach? To catch some waves... and show off its cheeky side!",
        "Why was the bottom sad? Because it felt cheeky!",
        "Why did the chair blush? Because it saw the table's bottom!",
        "Why did the bread sit on the bottom shelf? It wanted to rise from the bottom up!",
        "Why did the bottom enroll in an art class? It wanted to learn how to draw attention!",
        "Why did the bottom go to the gym? It wanted to work on its gluteus maximus!",
        "Why did the bottom become a computer programmer? It realized life's all about getting to the top from the bottom!",
        "Why did the bottom want to be an astronaut? It heard there's a great view from the bottom of space!",
        "Why did the bottom start a band? It wanted to make some bottom-rumbling music!",
        "Why did the bottom become a detective? It had a knack for cracking cases!",
        "Why did the bottom go to school? It wanted to get to the bottom of things!",
        "Why did the bottom go on a diet? It wanted to achieve bottom-line results!",
        "Why did the bottom start gardening? It wanted to learn about root causes!",
        "Why did the bottom become a detective? It had a knack for getting to the bottom of mysteries!",
 
        "Doctor, my bottom hurts right around the entrance. That's the exit, as long as you call it the entrance it will hurt.",
        "How did Harry Potter make it to the bottom of the hill? By walking... jk rolling",
        "Doctor, there is a piece of lettuce sticking out of my bottom. The doctor asks him to drop his trousers and examines him. The man asks, 'Is it serious, doctor?' and the doctor replies: 'Im sorry to tell you, but this is just the tip of the iceberg.'",
        "I bought a new deodorant yesterday. The instructions said 'Remove cap and push up bottom'. It hurt like hell, but my farts smell great.",
        "What do you call the doctor who graduates at the bottom of the class? Doctor",
        "I passed out at the bottom of a multi-species orgy. I don't know what came over me",
        "What has two bottoms and kills people? An assassin",
        "What has a bottom at its top? A leg",
        "If someone pushes you off a 100 story building, how long does it take you to get to the bottom? The rest of your life",
        "A vegan and a vegetarian are jumping off a cliff to see who will hit the bottom first.  Who wins?  Society",
        "What do you call an ox with a big butt? Buttocks",
        "I accidentally butt dialed by ex last night. I swear it's the only booty call I've ever made",
        "What does a cannibal do after dumping his girlfriend? He wipes his butt",
        "Is butt cheeks one word... Or should I spread them apart?",
        "A bear and a rabbit are taking a shit in the woods. The bear turns to the rabbit and says excuse me, do you have problems with shit sticking to your fur? The rabbit says no. So the bear wiped his ass with the rabbit",
        // Add even more bottom-related jokes here
    ];
 
 
    shuffleArray(bottomJokes);
 
    const joke = bottomJokes[jokeIndex];
    jokeIndex = (jokeIndex + 1) % bottomJokes.length;
 
    send({
        cmd: 'chat',
        text: joke
    });
}
 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
