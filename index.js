const mineflayer = require('mineflayer');
const http = require('http');

// Web server to keep Railway/Render alive
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
});
server.listen(process.env.PORT || 8080);

function createBot() {
    console.log('Attempting to connect to Aternos...');
    
    const bot = mineflayer.createBot({
        host: 'bluegill.aternos.host',
        port: 45056,
        username: 'Souls247Bot',
        version: '26.1.2', // Keep this set to your server version
        checkTimeoutInterval: 15000 
    });

    // CRITICAL: This will tell us exactly why it disconnects
    bot.on('kicked', (reason) => {
        console.log('❌ BOT KICKED BY SERVER. Reason JSON:', reason);
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
