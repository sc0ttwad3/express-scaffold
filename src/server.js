
const chalk = require('chalk')
const debug = require('debug')('express-scaffold:server')
const http = require('http')
const app = require('./app');

const port = process.env.PORT || '3000';

// Boostrap Express server
(async function start() {
  const server = await http.createServer(app);
  //server.on('error', onError);
  //server.on('listening', onListening);
  server.listen(
    port,
    () => console.log(chalk.bold.blue(`Express server listening on ${port} ...`))
  );
})();
