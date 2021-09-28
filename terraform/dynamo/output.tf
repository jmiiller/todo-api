output "ddb_name" {
  description = "Name of todo items table."
  value = aws_dynamodb_table.todo-items.name
}