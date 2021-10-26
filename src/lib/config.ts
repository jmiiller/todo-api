export default class Config {
  readonly port = process.env.PORT;

  readonly dynamoTableName = process.env.DDB_TABLE_NAME;
}
