import server from "./app.js";
import logger from "./logger.js";

server.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
