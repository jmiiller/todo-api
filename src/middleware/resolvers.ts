import { merge } from 'lodash';
import todoResolvers from '../graphql/resolvers/todo';

export default merge(todoResolvers);
