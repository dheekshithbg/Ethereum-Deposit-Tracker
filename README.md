# Ethereum Deposit Tracker

This project is a blockchain-based tracker that monitors Ethereum deposits to the **Beacon Chain Deposit** contract. It utilizes the **Alchemy SDK** to monitor new blocks and transactions on the Ethereum network. When a deposit to the specified contract is detected, an alert containing transaction details is sent via a **Telegram bot**.


# Features
- **Ethereum Deposit Monitoring**: Continuously monitors Ethereum blockchain for new deposits to the Beacon chain deposit contract.
- **Real-Time Telegram Alerts**: Sends notifications through Telegram when deposits are detected, with detailed information.
- **Block Timestamp Calculation**: Each alert includes the **Unix timestamp** of the block in which the deposit was made.


# Table of Contents
- Installation
- Environment Variables
- Usage
- Project Structure
- Technologies Used
- Telegram Notification Setup
- License


## Installation

1. **Clone this repository to your local machine:**
    ```bash
    git clone https://github.com/dheekshithbg/ethereum-deposit-tracker.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd ethereum-deposit-tracker
    ```

3. **Install all the necessary dependencies:**
   This project relies on several Node.js packages to interact with the Ethereum blockchain, send Telegram notifications, and          manage environment variables.

   Run the following command to install all the required dependencies:

    ```bash
    npm install
    ```
    This will install the core dependencies such as axios, alchemy-sdk, dotenv, winston.

    If any additional dependencies are required, you can install them using:
   
    ```bash
    npm install
    ```
    Some packages you might need depending on your setup include:
    - date-fns
    
3. **Set up environment variables**:
   Create a `.env` file in the `src/` directory and add the following:
      ```plaintext
      ALCHEMY_API_URL=YOUR_ALCHEMY_API_URL
      TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
      TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
      DEPOSIT_ADDRESS='0x00000000219ab540356cBB839Cbe05303d7705Fa' # Beacon Chain Deposit address
      ```

4. **Run the application**:
    ```bash
    node src/index.js
    ```
    OR **Run the following command**
    ```bash
    npm start
    ```

## Environment Variables

Create the .env file in the `src` folder and add the following variables:

- Alchemy API KEY to connect to Ethereum Mainnet
ALCHEMY_API_KEY=your_alchemy_api_key

- Telegram bot token obtained from BotFather
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

- Telegram chat ID where you want to receive notifications
TELEGRAM_CHAT_ID=your_telegram_chat_id


## Usage
```bash
node src/index.js
```


## Project Structure

```bash
├── src
│   ├── utils   
│   │   ├── logger.js           # Winston-based logger for tracking events and errors
│   ├── .env                    # Contains environment variables configuration
│   ├── index.js                # Main script for tracking Ethereum deposits
│   └── telegramBot.js          # Sends Telegram alerts
├── package.json                # Project dependencies and scripts
└── README.md                   # This readme file
```


## Technologies Used
- **Node.js:** JavaScript runtime for building the application.
- **Alchemy SDK:** For interacting with the Ethereum blockchain.
- **Telegram Bot API:** To send deposit alerts.
- **Winston:** Logging library used to track errors and events.
- **dotenv:** For managing environment variables.
- **axios:** For making HTTP requests to the Telegram API.


## Telegram Notification Setup
To set up Telegram notifications:

1. **Create a Telegram Bot:**

- Go to Telegram and search for the BotFather.
- Create a new bot using the /newbot command.
- Once created, you will get a bot token. Save this token in the .env file under TELEGRAM_BOT_TOKEN.

2. **Obtain Chat ID:**

- Start a chat with your newly created bot by sending a message like "Hello".
- You can get your chat ID by calling this API:
```bash
https://api.telegram.org/bot<Your-Bot-Token>/getUpdates
```
- In the response, find the chat ID and save it in the .env file under TELEGRAM_CHAT_ID.

3. **Receive Notifications:**

- When deposits to the Ethereum beacon chain are detected, you'll receive notifications in the specified chat containing:
Transaction hash
Sender's pubkey
Gas fee
Unix block timestamp

## Example Telegram Message

```bash
Beacon Deposit detected:
- hash: 0x123abc456def789...
- pubkey: 0x5a0036bcaB4501E70F086C634e2958A8BeaE3a11
- fee: 0.01 ETH
- blockNumber: 20719534
- blockTimestamp: 1694345678 (Unix Timestamp)
```


# License
This project is licensed under the MIT License. See the LICENSE file for more details.



