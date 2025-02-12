import logger from "../../../logger.js";

const handleClose = (ws, code, reason, authUsers) => {
  if (ws.checkTokenInterval) {
    clearInterval(ws.checkTokenInterval);
  }

  if (code === 1000) {
    logger.info(
      `[close] Connexion closed cleanly, code=${code}, reason=${reason}`
    );
  } else {
    logger.warn(`[close] Connection died, code=${code} reason=${reason}`);
  }

  if (ws.user && ws.user.id) {
    authUsers.delete(ws.user.id);
    logger.info(`User ${ws.user.id} disconnected`);
  }
};

export default handleClose;
