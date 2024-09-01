const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const ensureStorage = require('./helpers/ensureStore');

dotenv.config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const store = ensureStorage();

bot.onText(/\/create-task (.+)/, (msg, match) => {
    try {
        const chatId = msg.chat.id;
        
        // Title-1897239
        const task = match[1];
        const title = task.split('-')[0];
        const remindAt = task.split('-')[1];
    
        store.put(`${chatId}`, {
            title,
            remindAt,
        });
    
        bot.sendMessage(chatId, `Task "${title}" was created. Remind will be at "${remindAt}"`); 
    } catch (error) {
        console.log("🚀 ~ bot.onText ~ error:", error)
        
    }
});

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp); 
// });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  console.log("🚀 ~ bot.on ~ msg:", msg);
});

// bot.on('sticker', (msg) => {
//     console.log("🚀 ~ bot.on ~ msg:", msg)
//     const chatId = msg.chat.id;
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your sticker');
// });

// bot.on('voice', (msg) => {
//     console.log("🚀 ~ bot.on ~ msg:", msg)
//     const chatId = msg.chat.id;
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your voice');
//   });
