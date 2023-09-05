const riddles = [
    { question: "What has keys but can't open locks?", answer: "piano" },
    { question: "What has a heart that doesn't beat?", answer: "artichoke" },
    { question: "What is always in front of you but can't be seen?", answer: "future" },
    { question: "What can go up a chimney down but can't go down a chimney up?", answer: "umbrella" },
    { question: "What falls, but never needs a bandage?", answer: "rain" },
    { question: "What is full of holes but still holds water?", answer: "sponge" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    { question: "What has a ring but no finger?", answer: "telephone" },
    { question: "What can you hold in your hand but can't keep?", answer: "water" },
    { question: "What can be cracked, made, told, and played?", answer: "joke" },
    { question: "What can travel around the world while staying in a corner?", answer: "stamp" },
    { question: "What can't be seen but can be felt, and changes with the wind?", answer: "temperature" },
    { question: "What grows shorter as it gets older?", answer: "candle" },
    { question: "What can be caught but never thrown?", answer: "cold" },
    { question: "What can fly without wings?", answer: "time" },
    { question: "What is the beginning of eternity, the end of time and space?", answer: "e" },
    { question: "What has keys but no locks?", answer: "keyboard" },
    { question: "What is taken from a mine but never released?", answer: "lead" },
    { question: "What has cities but no houses?", answer: "map" },
    { question: "What can't be used unless broken?", answer: "egg" },
    { question: "What can't be burned in a fire nor drowned in water?", answer: "ice" },
    { question: "What can't be held for more than a few seconds, but it is impossible to live without?", answer: "breath" },
    { question: "What can't be bought, begged, borrowed, or stolen, yet is often given?", answer: "pardon" },
    { question: "What is easy to get into but hard to get out of?", answer: "trouble" },
    { question: "What can you catch but not throw?", answer: "cold" },
    { question: "What can be used to make honey but not bread?", answer: "bee" },
    { question: "What can be seen with the eyes closed?", answer: "dreams" },
    { question: "What can be broken but is never held?", answer: "promise" },
    { question: "What can be seen in the middle of March and April that can't be seen at the beginning or end of either month?", answer: "r" },
    { question: "What has keys but can't open locks?", answer: "piano" },
    { question: "What is full of holes but still holds water?", answer: "sponge" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    { question: "What has a ring but no finger?", answer: "telephone" },
    { question: "What can you hold in your hand but can't keep?", answer: "water" },
    { question: "What can't be seen but can be felt, and changes with the wind?", answer: "temperature" },
    { question: "What grows shorter as it gets older?", answer: "candle" },
    { question: "What can be caught but never thrown?", answer: "cold" },
    { question: "What can fly without wings?", answer: "time" },
    { question: "What is the beginning of eternity, the end of time and space?", answer: "e" },
    { question: "What has keys but no locks?", answer: "keyboard" },
    { question: "What is taken from a mine but never released?", answer: "lead" },
    { question: "What has cities but no houses?", answer: "map" },
    { question: "What can't be used unless broken?", answer: "egg" },
    { question: "What can't be burned in a fire nor drowned in water?", answer: "ice" },
    { question: "What can't be held for more than a few seconds, but it is impossible to live without?", answer: "breath" },
    { question: "What can't be bought, begged, borrowed, or stolen, yet is often given?", answer: "pardon" },
    { question: "What is easy to get into but hard to get out of?", answer: "trouble" },
    { question: "What can you catch but not throw?", answer: "cold" },
    { question: "What can be used to make honey but not bread?", answer: "bee" },
    { question: "What can be seen with the eyes closed?", answer: "dreams" },
    { question: "What can be broken but is never held?", answer: "promise" },
    { question: "if a rooster lays an egg on an edge, will the egg roll to the left or the right", answer: "neither" },
    { question: "what do you call two banana peels lying on the floor beside each other", answer: "slippers" },
    { question: "what do you get when you cross a vampire building a snowman", answer: "frostbite" },
    { question: "what kind of room has no doors, windows or furniture", answer: "mushroom" },
    { question: "what has a lot of needles but doesn't sew anything", answer: "porcupine" },
    { question: "what starts with the letter e, ends with the letter e, and has only one letter inside", answer: "envelope" },
    { question: "what can jump higher than a tower", answer: "anyone" },
    { question: "what wears a green hat and sounds like a parrot", answer: "carrot" },
    { question: "what goes away as soon as you mention it", answer: "silence" },
    { question: "which month has 28 days", answer: "all" },
    { question: "a bear walks one mile south, one mile east, and one mile north and ends up back where he starts. what color is the bear?", answer: "white" },
    { question: "If you are running in a race and pass the person in second place, what position are you in?", answer: "second"},
    // ... (add more riddles here)
];
 
 
 
module.exports = riddles;
 
 
function getRandomRiddle() {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    return riddles[randomIndex];
}
 
module.exports = {
    riddles,
    getRandomRiddle,
};
