import axios from 'axios'; // Import axios for making HTTP requests
import logService from './utils/logger.js'; // Import a custom logger
import 'dotenv/config'; // Load environment variables from the .env file

async function triggerTelegramAlert(message) {
    try {
        // Retrieve Telegram bot token and chat ID from environment variables
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        // Log the bot token to check if it was retrieved correctly
        console.log(botToken);
        
        // Validate that both the bot token and chat ID exist
        if (!botToken || !chatId) {
            throw new Error('Bot token or chat ID is not defined');
        }
        
        // Log the bot token and chat ID for debugging purposes
        console.log(`Bot Token: ${botToken}`);
        console.log(`Chat ID: ${chatId}`);

        // Construct the URL for sending the message using the Telegram Bot API
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        // Send the POST request to the Telegram API with the chat ID and message
        const response = await axios.post(telegramUrl, {
            chat_id: chatId, // The chat where the message will be sent
            text: message // The message content
        });

        // Check the response to ensure the message was sent successfully
        if (response.data.ok) {
            logService.info(`Telegram notification sent: ${message}`);
        } else {
            throw new Error(`Telegram API error: ${response.data.description}`);
        }
    } catch (error) {
        // Log any errors that occurred during the process
        logService.error(`Error sending Telegram notification: ${error.message}`);
    }
}

export default triggerTelegramAlert;
