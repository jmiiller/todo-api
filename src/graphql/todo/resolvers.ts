const dummy = [
  {
    content: 'todo1',
  },
  {
    content: 'todo2',
  },
];

export const resolvers = {
  Query: {
    todoItems: () => dummy,
  },
};

export default resolvers;
