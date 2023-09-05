let gameNameList = ["hangman", "riddle"]; // Enter all your games’ name here as a list
let gameName = extractGameName(message); // message is the text users input in the chat

if (gameNameList.indexOf(gameName) > -1) {
let gameMessageList = message.split(" ").slice(1);
let gameMessage = gameMessageList.join(" "); // This is the text after #game
switch (gameName) {
case "hangman":
break;
case "riddle":
break;
// Add your code in each section. btw, modify the code a bit to fit it
}
}
