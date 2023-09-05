const WebSocket = require('ws');
const axios = require('axios');
 
const DATAMUSE_API_URL = 'https://api.datamuse.com/words';
 
let client = new WebSocket('wss://hack.chat/chat-ws');
 
let lastLine = '';
let poemLines = [];
 
function send(data) {
    client.send(JSON.stringify(data));
}
 
client.on('open', function () {
    send({
        cmd: 'join',
        channel: 'games', // Replace with your channel name
        nick: 'poem_bot'
    });
    send({
        cmd: 'chat',
        text: `[Collaborative Poem] Welcome! Let's create a collaborative poem where every line rhymes with the previous line. To contribute, type #contribute followed by your line.`
    });
    send({
        cmd: 'chat',
        text: `[Collaborative Poem] To view the current poem, type #viewpoem.`
    });
});
 
// ... (previous code)
 
async function validateRhyming(lastWord, newLine) {
    try {
        const response = await axios.get(`${DATAMUSE_API_URL}?rel_rhy=${lastWord}`);
        const rhymingWords = response.data.map(item => item.word.toLowerCase());
 
        // New validation: Check if the entire new line contains only letters a-z
        if (!/^[a-zA-Z\s]+$/.test(newLine)) {
            return false;
        }
 
        const newLastWord = newLine.split(' ').pop().toLowerCase();
        return rhymingWords.includes(newLastWord);
    } catch (error) {
        console.error('Error validating rhyming word:', error);
        return false;
    }
}
 
 
// ... (rest of the code)
 
 
// ... (previous code)
 
client.on('message', async function (data) {
    let args = JSON.parse(data);
    if (args.cmd === 'chat') {
        const { nick, text } = args;
        if (text.startsWith('#contribute')) {
            const newLine = text.substring(11).trim();
 
            // New validation: Check if the entire new line contains only letters a-z
            if (!/^[a-zA-Z\s]+$/.test(newLine)) {
                send({
                    cmd: 'chat',
                    text: `[Collaborative Poem] Your contribution should contain only letters A-Z and spaces.`
                });
                return;
            }
 
            if (!lastLine) {
                lastLine = newLine;
                poemLines.push(newLine);
                send({
                    cmd: 'chat',
                    text: `[Collaborative Poem] ${nick} contributed: "${newLine}".`
                });
            } else {
                const lastWord = lastLine.split(' ').pop().toLowerCase();
                if (await validateRhyming(lastWord, newLine)) {
                    lastLine = newLine;
                    poemLines.push(newLine);
                    send({
                        cmd: 'chat',
                        text: `[Collaborative Poem] ${nick} contributed: "${newLine}".`
                    });
                } else {
                    send({
                        cmd: 'chat',
                        text: `[Collaborative Poem] Your line should rhyme with the last line: "${lastLine}".`
                    });
                }
            }
        } else if (text === '#viewpoem') {
            const fullPoem = poemLines.join('\n');
            send({
                cmd: 'chat',
                text: `[Collaborative Poem] Collaborative Poem:\n${fullPoem}`
            });
        }
    } else if (args.cmd === 'onlineAdd') {
        const { nick } = args;
        send({
            cmd: 'chat',
            text: `[Collaborative Poem] Welcome, ${nick}! Let's create a collaborative poem where every line rhymes with the previous line. To contribute, type #contribute followed by your line.`
        });
        send({
            cmd: 'chat',
            text: `[Collaborative Poem] To view the current poem, type #viewpoem.`
        });
    }
});
