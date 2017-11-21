
const chalk = require('chalk')
const debug = require('debug')('express-scaffold:server')
const http = require('http')
const app = require('./app');

const appError = require('./common/appError');

const port = process.env.PORT || '3000';
let user = null;

//client throwing an exception
if(user == null)
  throw new appError(commonErrors.resourceNotFound, commonHTTPErrors.notFound, "further explanation", true)

/*
 *  Boostrap Express server
 */
async function bootstrap() {
  const server = await http.createServer(app);
  //server.on('error', onError);
  
  //server.on('listening', onListening);
  await server.listen(
    port,
    () => console.log(chalk.bold.blue(`Express server listening on ${port} ...`))
  );
}

bootstrap();
