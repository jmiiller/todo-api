output "ddb_name" {
  description = "Name of todo items table."
  value = module.dynamo.ddb_name
}