const WebSocket = require('ws');
let client = new WebSocket('wss://hack.chat/chat-ws');

const HANG_FROGS = [
  [
    // ASCII art for Hangman image 1
    // ...
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  [
    // ASCII art for Hangman image 2
    // ...
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
"⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  // Add more Hangman images here
  [
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  [
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  [
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬜⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬜⬜⬜⬛⬜⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  [
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬜⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬜⬜⬜⬛⬜⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ],
  [
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬜⬛⬜⬛⬛⬜⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬜⬜⬜⬛⬜⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬛⬜⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬜⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬜⬛⬛⬛⬛⬛⬛⬛⬜⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛",
    "⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛",
    "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"
  ]
];

const WORDS_LIST = [
  // Fruits
  'APPLE', 'BANANA', 'CHERRY', 'ORANGE', 'GRAPEFRUIT', 'MANGO', 'PINEAPPLE', 'WATERMELON', 'STRAWBERRY',
  'BLUEBERRY', 'RASPBERRY', 'BLACKBERRY', 'KIWI', 'PEACH', 'PEAR', 'PLUM', 'APRICOT', 'FIG', 'COCONUT',
  'AVOCADO', 'POMEGRANATE', 'LIME', 'LEMON', 'CANTALOUPE', 'HONEYDEW', 'NECTARINE', 'GUAVA', 'PASSIONFRUIT',
  // Vegetables
  'BROCCOLI', 'CARROT', 'POTATO', 'TOMATO', 'CUCUMBER', 'PEPPER', 'LETTUCE', 'SPINACH', 'CABBAGE', 'CELERY',
  'CAULIFLOWER', 'ASPARAGUS', 'ONION', 'GARLIC', 'BEET', 'RADISH', 'TURNIP', 'SQUASH', 'ZUCCHINI', 'EGGPLANT',
  // Animals
  'ELEPHANT', 'GIRAFFE', 'RHINOCEROS', 'HIPPOPOTAMUS', 'ZEBRA', 'LION', 'TIGER', 'LEOPARD', 'CHEETAH', 'PANDA',
  'KANGAROO', 'Koala', 'WOLF', 'FOX', 'BEAR', 'GORILLA', 'MONKEY', 'SQUIRREL', 'RACCOON', 'ANTELOPE', 'BUFFALO',
  'CROCODILE', 'GIRAFFE', 'CHIMPANZEE', 'WALRUS', 'SEAL', 'OTTER', 'SLOTH', 'EAGLE', 'OWL', 'HAWK', 'FALCON',
  'PEACOCK', 'OSTRICH', 'SWAN', 'CRANE', 'FLAMINGO', 'PARROT', 'PENGUIN', 'TOUCAN', 'TORTOISE', 'JAGUAR', 'EAGLE',
  'SNAKE', 'ALLIGATOR', 'SALAMANDER', 'TURTLE', 'FROG', 'TIGER', 'PANTHER', 'LEOPARD', 'COUGAR', 'COYOTE', 'LYNX',
  // Halloween
  'PUMPKIN', 'GHOST', 'WITCH', 'VAMPIRE', 'ZOMBIE', 'WEREWOLF', 'FRANKENSTEIN', 'MUMMY', 'BROOMSTICK', 'CAULDRON',
  'WAND', 'SPELLBOOK', 'POTION', 'DRAGON', 'SKELETON', 'GRAVEYARD', 'CANDY', 'SPIDER', 'BAT', 'MOON', 'WOLF',
  'BLACK CAT', 'CANDLE', 'HAUNTED HOUSE', 'COSTUME', 'TRICK OR TREAT', 'CANDY CORN', 'CARRIAGE', 'CROW', 'GARGOYLE',
  // Fantasy
  'UNICORN', 'DRAGON', 'MERMAID', 'FAIRY', 'ELF', 'DWARF', 'TROLL', 'GIANT', 'OGRE', 'PHOENIX', 'CENTAUR', 'GRIFFIN',
  'PEGASUS', 'CHIMERA', 'WIZARD', 'WITCH', 'ENCHANTED', 'MAGIC', 'CASTLE', 'KINGDOM', 'QUEEN', 'PRINCE', 'PRINCESS',
  'KNIGHT', 'SWORD', 'SHIELD', 'ARMOR', 'AMULET', 'POTION', 'SPELL', 'MAGICAL', 'FAIRYTALE', 'REALM', 'DIMENSION',
  // Technology
  'ASTRONAUT', 'ROCKET', 'PLANET', 'SATELLITE', 'COMPUTER', 'PROGRAMMING', 'JAVASCRIPT', 'PYTHON', 'HACKCHAT', 'OPENAI',
  'MACHINE LEARNING', 'ARTIFICIAL INTELLIGENCE', 'GPT', 'CHATBOT', 'ALGORITHM', 'DATA STRUCTURE', 'CLOUD COMPUTING',
  'CRYPTOCURRENCY', 'BLOCKCHAIN', 'ARTIFICIAL INTELLIGENCE', 'VIRTUAL REALITY', 'COMPUTER VISION', 'NANOTECHNOLOGY', 'SMARTPHONE',
  'INTERNET', 'SOCIAL MEDIA', 'WEBSITE', 'APP', 'GAMING', 'SOFTWARE', 'HARDWARE', 'NETWORK', 'ROBOTICS', 'SPACE EXPLORATION',
  // Art & Entertainment
  'ART', 'MUSIC', 'DANCE', 'LITERATURE', 'THEATER', 'MOVIE', 'FILMMAKER', 'ACTOR', 'ACTRESS', 'DIRECTOR', 'PRODUCER',
  'SCREENPLAY', 'PLAYWRIGHT', 'NOVELIST', 'POET', 'SINGER', 'DANCER', 'PAINTER', 'SCULPTOR', 'MUSICIAN', 'COMPOSER',
  'PHOTOGRAPHY', 'CINEMA', 'CINEMATOGRAPHY', 'DANCING', 'FILMMAKING', 'PERFORMANCE', 'EXHIBITION', 'CONCERT', 'SYMPHONY', 'BALLET',
  'TRAGEDY', 'COMEDY', 'THRILLER', 'ROMANCE', 'ACTION', 'ADVENTURE', 'FANTASY', 'HORROR', 'SCIENCE FICTION', 'DOCUMENTARY',
  // Science & Education
  'SCIENCE', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY', 'CHEMISTRY', 'PHYSICS', 'ASTRONOMY', 'MATHEMATICS', 'ENVIRONMENT', 'GEOLOGY',
  'PALEONTOLOGY', 'ARCHEOLOGY', 'ANTHROPOLOGY', 'SOCIOLOGY', 'PSYCHOLOGY', 'PHILOSOPHY', 'ENGINEERING', 'MEDICINE', 'SPACE', 'UNIVERSE',
  'EVOLUTION', 'GENETICS', 'EQUATION', 'THEORY', 'INVENTION', 'EXPERIMENT', 'RESEARCH', 'LEARNING', 'KNOWLEDGE', 'DISCOVERY',
  // Food & Cooking
  'FOOD', 'TRAVEL', 'RESTAURANT', 'COOKING', 'CHEF', 'INGREDIENT', 'RECIPE', 'CUISINE', 'DESSERT', 'BEVERAGE', 'COFFEE',
  'TEA', 'CHOCOLATE', 'ICE CREAM', 'PASTA', 'PIZZA', 'SUSHI', 'BURGER', 'SALAD', 'SOUP', 'STEAK', 'SEAFOOD',
  'FRUIT', 'VEGETABLE', 'SPICE', 'HERB', 'BAKERY', 'PASTRY', 'BARBECUE', 'GRILL', 'SMOOTHIE', 'CAKE', 'BREAD',
  // Health & Wellness
  'HEALTH', 'FITNESS', 'YOGA', 'MEDITATION', 'MINDFULNESS', 'HAPPINESS', 'NUTRITION', 'EXERCISE', 'WELLNESS', 'SELF-CARE',
  'STRESS', 'ANXIETY', 'DEPRESSION', 'MENTAL HEALTH', 'PHYSICAL HEALTH', 'MIND-BODY', 'RELAXATION', 'ENERGY', 'BALANCE', 'HARMONY',
  'PEACE', 'HOLISTIC', 'HEALING', 'WELL-BEING', 'SELF-LOVE', 'SELF-AWARENESS', 'SELF-DISCOVERY', 'SELF-IMPROVEMENT', 'POSITIVITY', 'CONFIDENCE',
  // Values & Virtues
  'LOVE', 'FRIENDSHIP', 'FAMILY', 'COMPASSION', 'KINDNESS', 'EMPATHY', 'GENEROSITY', 'GRATITUDE', 'FORGIVENESS', 'HONESTY',
  'LOYALTY', 'PATIENCE', 'RESPECT', 'HUMILITY', 'RESILIENCE', 'COURAGE', 'INTEGRITY', 'CHARITY', 'TOLERANCE', 'UNITY',
  'DIVERSITY', 'EQUALITY', 'FREEDOM', 'DEMOCRACY', 'HUMANITY', 'JUSTICE', 'PEACE', 'SOLIDARITY', 'HUMAN RIGHTS', 'COMPETENCE',
  // Miscellanea
  'ADVENTURE', 'DREAM', 'ACHIEVEMENT', 'SUCCESS', 'VICTORY', 'GOAL', 'CHALLENGE', 'OPPORTUNITY', 'JOURNEY', 'DESTINY',
  'CURIOSITY', 'WONDER', 'INSPIRATION', 'IMAGINATION', 'HOPE', 'DILIGENCE', 'PERSEVERANCE', 'AMBITION', 'LEADERSHIP', 'INNOVATION',
  'LEGACY', 'LEGEND', 'MYTH', 'REALITY', 'MIRACLE', 'MAGIC', 'SURPRISE', 'CELEBRATION', 'FESTIVAL', 'CEREMONY',
  'TRADITION', 'CUSTOM', 'RITUAL', 'ADAPTATION', 'CHANGE', 'TRANSFORMATION', 'EVOLUTION', 'PROGRESS', 'CONNECTION', 'RELATIONSHIP',
  // And many more words...
];

const MAX_WRONG_GUESSES = 6;
let currentWord = '';
let guessedWord = '';
let wrongGuesses = 0;
let usedLetters = new Set();
let currentHangFrogIndex = 0;

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS_LIST.length);
  return WORDS_LIST[randomIndex];
}

function initializeGame() {
  currentWord = getRandomWord().toUpperCase();
  guessedWord = currentWord.replace(/\w/g, '_');
  wrongGuesses = 0;
  usedLetters.clear();
}

function updateGuessedWord(letter) {
  let updatedWord = '';
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter || guessedWord[i] !== '_') {
      updatedWord += currentWord[i];
    } else {
      updatedWord += '_';
    }
  }
  guessedWord = updatedWord;
}

function send(data) {
  client.send(JSON.stringify(data));
}

function displayGameStatus() {
  const hangFrogDisplay = HANG_FROGS[currentHangFrogIndex].join('\n');
  const formattedGuessedWord = guessedWord.split('').join(' ');
  const display = `${hangFrogDisplay}\n\nGuessed word: ${formattedGuessedWord}\n\nUsed letters: ${[...usedLetters].join(', ')}\n\n`;
  send({ cmd: 'chat', text: display });
}

// ... (previous code remains the same)

function startNewGame() {
  initializeGame();
  currentHangFrogIndex = 0; // Reset Hangman image index to the first image
  displayGameStatus();
}

// ... (rest of the code remains the same)


function handleChatMessage(args) {
  const nick = args.nick;
  const text = args.text;

  if (text.startsWith('hangman')) {
    if (text === 'hangman /help') {
      send({ cmd: 'chat', text: 'HangmanBot: Available commands:\n' +
        '  hangman /start - Start a new game\n' +
        '  hangman /guess [letter] - Make a guess by providing a letter\n' +
        '  hangman /board - View the current game status\n' +
        '  hangman /reset - Reset the game\n\n' +
        'To make a guess, use "hangman /guess [letter]", where [letter] is a single letter A-Z.' });
    } else if (text === 'hangman /start') {
      startNewGame();
    } else if (text.startsWith('hangman /guess ')) {
      const letter = text.slice(15).toUpperCase();
      if (letter.match(/^[A-Z]$/) && !usedLetters.has(letter)) {
        usedLetters.add(letter);
        if (currentWord.includes(letter)) {
          updateGuessedWord(letter);
          if (guessedWord === currentWord) {
            send({ cmd: 'chat', text: `Congratulations, ${nick}! You guessed the word: ${currentWord}\n\n` });
            startNewGame();
          } else {
            displayGameStatus();
          }
        } else {
          wrongGuesses++;
          if (wrongGuesses === MAX_WRONG_GUESSES) {
            const hangFrogDisplay = HANG_FROGS[6].join('\n'); // Display the seventh Hangman image
            send({ cmd: 'chat', text: `Sorry, ${nick}. You lost. The word was: ${currentWord}\n\n${hangFrogDisplay}` });
            startNewGame();
          }
           else {
            currentHangFrogIndex++;
            if (currentHangFrogIndex >= HANG_FROGS.length) {
              currentHangFrogIndex = 0;
            }
            displayGameStatus();
          }
        }
      } else {
        send({ cmd: 'chat', text: 'Invalid guess format. Please use "hangman /guess [letter]" to make a guess.' });
      }
    } else if (text === 'hangman /board') {
      displayGameStatus();
    } else if (text === 'hangman /reset') {
      initializeGame();
      displayGameStatus();
    }
  }
}

client.on('open', function () {
  console.log('Client connected');
  send({ cmd: 'join', channel: 'games', nick: 'HangmanBot' });

  // Send a message to greet users and inform them about the available commands
  send({ cmd: 'chat', text: 'HangmanBot has joined the games channel!\n' +
    'Use "hangman /help" to see the available commands and start a new game.\n' });
  startNewGame(); // Send the initial game status when the bot joins the chat
});

client.on('message', function (data) {
  console.log('Received message:', data);
  let args = JSON.parse(data);
  if (args.cmd === 'chat') {
    handleChatMessage(args);
  } else if (args.cmd === 'onlineAdd') {
    const newlyJoinedUser = args.nick;
    console.log('User joined:', newlyJoinedUser);

    // Send a whispered message to the newly joined user
    if (newlyJoinedUser !== 'HangmanBot') {
      send({ cmd: 'whisper', text: 'Welcome to the Hangman game! Use "hangman /help" to see the available commands and start a new game.\n',
        nick: newlyJoinedUser });
    }
  }
});

client.on('close', function (code, reason) {
  console.log('Connection closed:', code, reason);
});

client.on('error', function (error) {
  console.error('WebSocket error:', error);
});
