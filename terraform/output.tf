output "ddb_name" {
  description = "Name of todo items table."
  value = module.dynamo.ddb_name
}

output "apigateway_endpoint" {
  description = "apigateway_endpoint"
  value = aws_apigatewayv2_api.apigateway.api_endpoint
}