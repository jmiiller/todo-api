import express from 'express'; // compresses requests
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import path from 'path';
import expressBunyanLogger from 'express-bunyan-logger';
import favicon from 'serve-favicon';
import health from './routes/health';
import applyApolloMiddleware from './middleware/apolloMiddleware';
import configMiddleware from './middleware/configMiddleware';
import pageNotFound from './routes/pageNotFound';
import dynamoBrokerMiddleware from './middleware/dynamoBrokerMiddleware';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(
  expressBunyanLogger({
    name: 'todo-api',
    streams: [
      {
        level: 'info',
        stream: process.stdout,
      },
    ],
  })
);
app.use(configMiddleware);
app.use(dynamoBrokerMiddleware);

applyApolloMiddleware(app).then(() => {
  app.get('/health', health);
  app.get('/*', pageNotFound);
});

export default app;
