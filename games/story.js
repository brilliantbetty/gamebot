// main.js
const WebSocket = require('ws');
 
let client = new WebSocket('wss://hack.chat/chat-ws');
 
// Store the collaborative story parts
const storyParts = [];
 
// Function to send data to the WebSocket
function send(data) {
    client.send(JSON.stringify(data));
}
 
// Function to send a welcome message to a user
function sendWelcomeMessage(nick) {
    send({
        cmd: 'chat',
        text: `[STORY] Welcome to the collaborative storytelling channel, ${nick}! Use the command !add to contribute to the story and !viewstory to see the entire story.`,
    });
}
 
client.on('open', function () {
    console.log('Client connected');
    send({
        cmd: 'join',
        channel: 'games', // Create a dedicated channel for collaborative storytelling
        nick: 'story_bot'
    });
});
 
client.on('message', function (data) {
    let args = JSON.parse(data);
 
    if (args.cmd === 'chat') {
        const { nick, text } = args;
        console.log(`${nick}: ${text}`);
 
        // Check if the message is intended for collaborative storytelling
        if (text.startsWith('!add')) {
            // Extract the story part from the message
            const storyPart = text.substring(5).trim();
 
            // Store the story part
            storyParts.push(storyPart);
 
            // Broadcast the story part to the channel
            send({
                cmd: 'chat',
                text: `[STORY] ${nick} added: "${storyPart}"`
            });
        } else if (text === '!viewstory') {
            // Send the entire story to the requester
            if (storyParts.length > 0) {
                const entireStory = storyParts.join('. ');
                send({
                    cmd: 'chat',
                    text: `[STORY] Entire story: ${entireStory}`
                });
            } else {
                send({
                    cmd: 'chat',
                    text: `[STORY] The story is empty. Be the first to add a part!`
                });
            }
        }
    } else if (args.cmd === 'onlineAdd') {
        const { nick } = args;
 
        // Send a welcome message to the newly joined user
        sendWelcomeMessage(nick);
    }
});
