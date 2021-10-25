import Config from '../../lib/config';
import DynamoBroker from '../../graphql/data-sources/dynamoBroker';
import Bunyan from 'bunyan';

declare global {
  namespace Express {
    export interface Request {
      config: Config;
      dynamoBroker: DynamoBroker;
      log: Bunyan;
    }
  }
}