const { Util } = require("miqro-core");
const { Database } = require("miqro-sequelize");

process.env.MIQRO_DIRNAME=__dirname;
Util.loadConfig();

const db = Database.getInstance();

// await db.models[...].create({....})
// await db.transaction(async(transaction)=>{...})
