const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. Web Server to keep Render awake ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Souls247Bot is awake and keeping the world alive!\n');
});

// Render automatically assigns a PORT environment variable, or defaults to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌍 Web server is listening on port ${PORT}`);
});

// --- 2. Your Minecraft Bot ---
function createBot() {
    const bot = mineflayer.createBot({
        host: 'SoulSMP-OqYJ.aternos.me',
        username: 'Souls247Bot',
        version: false
    });

    bot.on('spawn', () => {
        console.log('🤖 Bot has successfully infiltrated Aternos!');
        
        // Loop 1: Look around randomly every 12 seconds to mimic human activity
        setInterval(() => {
            if (!bot.entity) return;
            const yaw = (Math.random() * 360 - 180) * (Math.PI / 180);
            const pitch = (Math.random() * 90 - 45) * (Math.PI / 180);
            bot.look(yaw, pitch, true);
        }, 12000);

        // Loop 2: Micro-movement routine every 35 seconds to reset AFK timers
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

        // Loop 3: Periodic chat heartbeats every 5 minutes to stay active
        setInterval(() => {
            bot.chat("Keeping the world awake! ☀️");
        }, 300000);
    });

    bot.on('end', () => {
        console.log('🔌 Disconnected from Aternos. Attempting revive in 20 seconds...');
        setTimeout(createBot, 20000);
    });

    bot.on('error', (err) => console.log('❌ Error occurred:', err));
}

createBot();
