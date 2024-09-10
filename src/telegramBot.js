import axios from 'axios';
import logService from './utils/logger.js';
import 'dotenv/config';

async function triggerTelegramAlert(message) {
    try {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        console.log(botToken);
        
        
        if (!botToken || !chatId) {
            throw new Error('Bot token or chat ID is not defined');
        }
        
        console.log(`Bot Token: ${botToken}`);
        console.log(`Chat ID: ${chatId}`);

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await axios.post(telegramUrl, {
            chat_id: chatId,
            text: message
        });

        if (response.data.ok) {
            logService.info(`Telegram notification sent: ${message}`);
        } else {
            throw new Error(`Telegram API error: ${response.data.description}`);
        }
    } catch (error) {
        logService.error(`Error sending Telegram notification: ${error.message}`);
    }
}

export default triggerTelegramAlert;
