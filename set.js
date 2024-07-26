const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUorT1dLMlR0Z1FWOWcyRU1IMkFhL3l1VnlIQVAzYmRUZGxsODJKOGxHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzVMTCtxR2w3ODdqaGN5YytUS3hvYk00UVIwMWZ6ZHJBalk2d1FBT1lqND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwR1diMmVncUVTcHVCdkJSRTd5czJDVTc2OEFBVGpXZ01ENGFwVFNjeTJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5YTliRUpmRmNnL3ZGaEFyTzUxZVI1UGVDcTJlclczRHd6aWtsUFQvRGlJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdCRVBQMmlmU2tJQjFRbXJuVHhUNHVkZy9wckZuOUV0NGt3TEoxdlFYa2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhBalY2ZE1oRW9JbWt3cTdCeWJ5MUVGNDU2N25zRnVmZENtL0I3dmFrUjg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkFlYXpvVmNhb0FhTXl5Qml3VnhOMXlRUWZKbXNyZTFsVk9tNlRKSXVtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEtVVjhSdFY2MEtmRnlQRjY4ZGhNaHBtblExZHNvaWZGeFBpZVo5VjF5WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5INGtBakN4U1pCQzhRTnc2TW1UVXBET2NkSGNHZW9kemx6dzMrcm84aFNJeGd3VGlVd1p3aHcvS3FoWWZpZldHaDdoZE14eFEya2dPcTBPMXJhd2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6ImpFV1hJbmgrSm1udDcycm93bW9hNUh2VE1GUVpPc0o2SHVyRm40VG9GYVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjQzNDkyWW1nUW1pUnZ0VHM0R0Q3b1EiLCJwaG9uZUlkIjoiYzlhMjQ4ODYtMWZjMS00MWY4LTgwMzMtOTZjZWI4YzJkNGFiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFVOXZTZUoreVdLempWSVNhMnBOeEVQOVdGND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkbFBHYTFNZEFYa1RqWWFzWnl1dHpYazRMM289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV05HM1RLQTgiLCJtZSI6eyJpZCI6IjIzNDgxNjg4NTU3OTE6OTdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lYVm5ZUUVFT2pqakxVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjFPZ2hiU1VwUGwyUVBKZDZPclozOXhka21zZ1c1ZTVqZms0bVh6YkdWaW89IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik53ZXJsZ3RjS0ZTUUdBRU93QUVldklXUGJxL0RwVUhWWk4xVENiY0J4NytVWTNnZC9kenp4amlKZkcwaC91Z3pMVUNLVTR1N01GQWFvRC9lTWJYYkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJENitxbzQ0RCt2WDlYMTdBZEZjcWRvaDUyd2dVU3p1L0llN3BXVjhGZ2ZKTCtSeEJSQ05POTloN3p4WERuR1dxR2tFQ2pRVnY1TE9YOHlUNXR1VWNoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjg4NTU3OTE6OTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZFRvSVcwbEtUNWRrRHlYZWpxMmQvY1haSnJJRnVYdVkzNU9KbDgyeGxZcSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTk3MTE5MX0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "SILENT",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348168855791", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
