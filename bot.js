const TOKEN = "2037254418:AAERgsSZrx49kxGAM0CJKbL2HN0h6HzWcYg";
const TELEGRAM_API = require('node-telegram-bot-api');
const PARSER = require('./parser.js');
const BOT = new TELEGRAM_API(TOKEN, {polling: true});

const Promise = require('bluebird');
Promise.config({
    cancellation: true
});

const start = () => {
    BOT.setMyCommands([
        {command: '/anekdot', description: 'get anekdot'}
    ]);
    
    BOT.on('message', async (message) => {
        const TEXT = message.text;
        const CHAT_ID = message.chat.id;

        if(TEXT !== undefined) {
            if(TEXT === '/start') {
                BOT.sendMessage(CHAT_ID, 'привет');
                return;
            }
    
            if(TEXT === '/anekdot' || TEXT === '/anekdot@proAnecdotsBot') {
                var anekdot = await PARSER();
                return BOT.sendMessage(CHAT_ID, anekdot);
            }
    
            return BOT.sendMessage(CHAT_ID, 'я тебя не понял');
        }
    });
}

start();