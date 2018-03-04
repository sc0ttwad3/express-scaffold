const chalk = require('chalk');
const debug = require('debug')('express-scaffold:server');
const http = require('http');
const app = require('./app');

/*
 *  Boostrap Express server
 */
const port = process.env.PORT || '3000';

async function bootstrap() {
  const server = await http.createServer(app);
  //server.on('error', onError);
  //server.on('listening', onListening);
  await server.listen(port, () => console.log(chalk.bold.blue(`Express server listening on ${port} ...`)));
}

bootstrap();

/**
 *  Graceful shutdown - look to using 'terminus' if in container and Kubernets
 *
 *
 */
process.on('SIGTERM', () => {
  logger.info('shutdown started')
  server.stop()
    .then(closeMysqlConnection())
    .then(() => {
      logger.info('process is stopping')
    })
})
