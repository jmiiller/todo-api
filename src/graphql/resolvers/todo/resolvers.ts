import Context from '../../Context';
import { Resolvers } from '../../types';

export const resolvers: Resolvers = {
  Query: {
    todoItem: (parent, args, context) => {
      const { input } = args;
      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.getTodoItem(input);
    },
    todoItems: (parent: any, args: Record<string, any>, context: Context) => {
      const { input } = args;
      context.req.log.info({ input }, 'todoItems');

      return context.req.dynamoBroker.getTodoItems();
    },
  },
  Mutation: {
    putTodoItem: async (parent, args, context) => {
      const { input } = args;

      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.putTodoItem(input);
    },
    deleteTodoItem: (parent, args, context) => {
      const { input } = args;

      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.deleteTodoItem(args.input);
    },
  },
};

export default resolvers;
