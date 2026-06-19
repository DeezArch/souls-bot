const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. Web Server to keep Render awake ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Souls247Bot is awake and keeping the world alive!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌍 Web server is listening on port ${PORT}`);
});

// --- 2. Your Minecraft Bot ---
function createBot() {
    console.log('Attempting to connect to Aternos...');
    
    const bot = mineflayer.createBot({
        host: 'bluegill.aternos.host',
        port: 45056,
        username: 'Souls247Bot',
        version: false,
        hideErrors: false,
        checkTimeoutInterval: 10000
    });
    bot.on('spawn', () => {
        console.log('🤖 Bot has successfully infiltrated Aternos!');
        
        setInterval(() => {
            if (!bot.entity) return;
            const yaw = (Math.random() * 360 - 180) * (Math.PI / 180);
            const pitch = (Math.random() * 90 - 45) * (Math.PI / 180);
            bot.look(yaw, pitch, true);
        }, 12000);

        setInterval(() => {
            if (!bot.entity) return;
            const actions = ['forward', 'back', 'sneak', 'jump'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            if (randomAction === 'jump') {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 400);
            } else if (randomAction === 'sneak') {
                bot.setControlState('sneak', true);
                setTimeout(() => bot.setControlState('sneak', false), 2000);
            } else {
                bot.setControlState(randomAction, true);
                setTimeout(() => bot.setControlState(randomAction, false), 300);
            }
        }, 35000);

        setInterval(() => {
            bot.chat("Keeping the world awake! ☀️");
        }, 300000);
    });

    bot.on('end', () => {
        console.log('🔌 Disconnected from Aternos. Attempting revive in 20 seconds...');
        setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => {
        console.log('❌ CRITICAL ERROR:', err.message);
    });
}

createBot();
