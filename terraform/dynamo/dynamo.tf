resource "aws_dynamodb_table" "todo-items" {
  name           = "todo-items"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name        = "todo-table-1"
    Environment = "production"
  }

  timeouts {
    create = "3m"
    update = "3m"
    delete = "3m"
  }
}