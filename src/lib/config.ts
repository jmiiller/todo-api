export default class Config {
  readonly ddbEndpoint = process.env.DDB_ENDPOINT;
  readonly dynamoTableName = process.env.DDB_TABLE_NAME;
}
