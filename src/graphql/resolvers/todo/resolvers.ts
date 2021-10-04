import Context from '../../Context';

export const resolvers = {
  Query: {
    todoItem: (parent: any, args: Record<string, any>, context: Context) => {
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
    putTodoItem: async (
      parent: any,
      args: Record<string, any>,
      context: Context
    ) => {
      const { input } = args;
      // console.log(JSON.stringify(context));
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
