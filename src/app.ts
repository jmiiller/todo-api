import express from 'express'; // compresses requests
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import path from 'path';
import expressBunyanLogger from 'express-bunyan-logger';
import { health } from './routes/health';
import applyApolloMiddleware from './middleware/apollo';

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
applyApolloMiddleware(app);
/**
 * Primary app routes.
 */
app.get('/health', health);

export default app;
