import logService  from './utils/logger.js'; // Import the custom logger utility
import { Alchemy, Network, Utils } from 'alchemy-sdk'; // Import Alchemy SDK for Ethereum interactions
import triggerTelegramAlert from './telegramBot.js';// Import function to send Telegram alerts
import { format } from 'date-fns';// Import date-fns to format dates
import 'dotenv/config';// Load environment variables from a .env file

// Get Alchemy API Key from environment variables
const alchemy_API_Key = process.env.ALCHEMY_API_KEY;

// Configure Alchemy settings
const alchemySettings = {
    apiKey: alchemy_API_Key, // Your Alchemy API Key
    network: Network.ETH_MAINNET, // The network you're using
    timeout: 180000 // Set a timeout
};

// Initialize the Alchemy instance with settings
const alchemy = new Alchemy(alchemySettings);
const depositContractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; // Address of the Ethereum 2.0 deposit contract (Beacon Chain)
let lastProcessedBlock = 0;


try {
    // Log the initialization of the tracker
    logService.info('Init:Eth2 Deposit Tracker...');
    const depositContractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

    // Get the latest block and listen to new blocks
    alchemy.ws.on("block", async (currentBlock) => {
    console.log("New block found:", currentBlock);

    // Process the block if it is newer than the last processed one
    if (currentBlock > lastProcessedBlock) {
        const blockData = await alchemy.core.getBlockWithTransactions(currentBlock);
        // Format block timestamp
        const blockTimestamp = new Date(blockData.timestamp * 1000); // Convert to milliseconds
        const formattedTimestamp = format(blockTimestamp, 'yyyy-MM-dd HH:mm:ss');

        blockData.transactions.forEach(tx => {
            if (tx.to && tx.to.toLowerCase() === depositContractAddress.toLowerCase()) {
                 // Prepare the deposit information message
                const depositInfo = `
        Beacon Deposit detected:
        -> blockNumber: ${currentBlock}
        -> blockTimestamp: ${formattedTimestamp}
        -> fee: ${Utils.formatEther(tx.gasPrice)} ETH
        -> hash: ${tx.hash}
        -> pubkey: ${tx.from}
    `;
                // Log the deposit information to the console
                console.log(depositInfo);
                // Send an alert with the deposit info to Telegram
                triggerTelegramAlert(depositInfo); 
            }
        });
        // Update the last processed block to the current block
        lastProcessedBlock = currentBlock;
    }
    });
} catch (error) {
    // Log any initialization error in the console and custom logger
    logService.error(`Err: Initialization failed: ${error.message}`);
}






