import express from 'express'; // compresses requests
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import path from 'path';
import expressBunyanLogger from 'express-bunyan-logger';
import health from './routes/health';
import applyApolloMiddleware from './middleware/apolloMiddleware';
import configMiddleware from './middleware/configMiddleware';
import pageNotFound from './routes/pageNotFound';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());
app.use(express.static(path.join(__dirname, 'public')));
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

applyApolloMiddleware(app).then(() => {
  app.get('/health', health);
  app.get('/*', pageNotFound);
});

export default app;
