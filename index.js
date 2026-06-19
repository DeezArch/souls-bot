const mineflayer = require('mineflayer');
const http = require('http');

// This keeps the Railway container "awake"
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
});
server.listen(process.env.PORT || 8080);

function createBot() {
    console.log('Attempting to connect to Aternos...');
    
    const bot = mineflayer.createBot({
        host: 'inconnu.aternos.host', // UPDATE THIS to match your current DynIP
        port: 45056,                  // UPDATE THIS to match your current Port
        username: 'Souls247Bot',
        version: false,               // Crucial: Auto-detects the version
        auth: 'offline',              // Required for Aternos "Cracked" servers
        checkTimeoutInterval: 15000 
    });

    // Logs the exact reason if the server rejects the connection
    bot.on('kicked', (reason) => {
        console.log('❌ BOT KICKED BY SERVER. Reason:', JSON.stringify(reason));
    });

    bot.on('error', (err) => {
        console.log('❌ BOT ERROR:', err);
    });

    bot.on('spawn', () => {
        console.log('🤖 Bot has successfully joined!');
        bot.chat("I have arrived!");
    });

    bot.on('end', () => {
        console.log('🔌 Disconnected. Retrying in 20 seconds...');
        setTimeout(createBot, 20000);
    });
}

createBot();
