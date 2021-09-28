import Config from '../lib/config';
import DynamoBroker from '../lib/dynamoBroker';

declare global {
  namespace Express {
    export interface Request {
      config: Config;
      dynamoBroker: DynamoBroker;
    }
  }
}
