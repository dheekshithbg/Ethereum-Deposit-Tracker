import { Alchemy, Network, Utils } from 'alchemy-sdk';
import triggerTelegramAlert from './services/telegramBot.js';
import { format } from 'date-fns';
import 'dotenv/config';

const alchemy_API_Key = process.env.ALCHEMY_API_URL;


const alchemySettings = {
    apiKey: alchemy_API_Key, // Your Alchemy API Key
    network: Network.ETH_MAINNET, // The network you're using
};

const alchemy = new Alchemy(alchemySettings);
const depositContractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
let lastProcessedBlock = 0;

// Get the latest block and listen to new blocks
alchemy.ws.on("block", async (currentBlock) => {
    console.log("New block found:::", currentBlock);

    if (currentBlock > lastProcessedBlock) {
        const blockData = await alchemy.core.getBlockWithTransactions(currentBlock);
        // Format block timestamp
        const blockTimestamp = new Date(blockData.timestamp * 1000); // Convert to milliseconds
        const formattedTimestamp = format(blockTimestamp, 'yyyy-MM-dd HH:mm:ss');

        blockData.transactions.forEach(tx => {
            if (tx.to && tx.to.toLowerCase() === depositContractAddress.toLowerCase()) {
                const depositInfo = `
                    Beacon Deposit detected:
                    -> blockNumber: ${currentBlock}
                    -> blockTimestamp: ${formattedTimestamp}
                    -> fee: ${Utils.formatEther(tx.gasPrice)} ETH
                    -> hash: ${tx.hash}
                    -> pubkey: ${tx.from}
                `;
                console.log(depositInfo);
                // triggerTelegramAlert(depositInfo); // Custom function for alerts
            }
        });
        lastProcessedBlock = currentBlock;
}
});
