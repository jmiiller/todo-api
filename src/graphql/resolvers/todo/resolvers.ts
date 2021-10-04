import Context from '../../Context';

export const resolvers = {
  Query: {
    todoItem: (parent: any, args: Record<string, any>, context: Context) => {
      const { input } = args;

      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.getTodoItem(input);
    },
  },
  Mutation: {
    putTodoItem: async (
      parent: any,
      args: Record<string, any>,
      context: Context
    ) => {
      const { input } = args;

      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.putTodoItem(input);
    },
    deleteTodoItem: (
      parent: any,
      args: Record<string, any>,
      context: Context
    ) => {
      const { input } = args;

      context.req.log.info({ input }, 'todoItem');

      return context.req.dynamoBroker.deleteTodoItem(args.input);
    },
  },
};

export default resolvers;
