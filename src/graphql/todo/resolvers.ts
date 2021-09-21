const dummy = [
  {
    id: '1',
    content: 'todo1',
  },
  {
    id: '2',
    content: 'todo2',
  },
];

export const resolvers = {
  Query: {
    todoItems: (
      parent: any,
      args: Record<string, any>,
      context: any,
      info: any
    ) => dummy,
  },
  Mutation: {
    putTodoItem: (
      parent: any,
      args: Record<string, any>,
      context: any,
      info: any
    ) => dummy[0],
    deleteTodoItem: (
      parent: any,
      args: Record<string, any>,
      context: any,
      info: any
    ) => dummy[1],
  },
};

export default resolvers;
