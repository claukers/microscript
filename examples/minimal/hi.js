const { Util } = require("miqro-core");

Util.loadConfig();
const logger = Util.getLogger("HI");
logger.info("hello");
logger.error("this is an error log");
logger.warn("this is a warning log");
logger.info("you can override the style or the transports on config/log.js");
