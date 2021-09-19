import express from "express"; // compresses requests
import bodyParser from "body-parser";
import responseTime from "response-time";
import path from "path";

import { health } from './routes/health';


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/health", health);

export default app;
