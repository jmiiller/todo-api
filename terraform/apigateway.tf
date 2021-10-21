resource "aws_apigatewayv2_api" "apigateway" {
  name          = local.name
  protocol_type = "HTTP"

  tags          = local.common_tags
}

resource "aws_apigatewayv2_integration" "apigateway" {
  api_id                    = aws_apigatewayv2_api.apigateway.id

  integration_type          = "AWS_PROXY"
  connection_type           = "INTERNET"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  payload_format_version    = "2.0"
}

resource "aws_apigatewayv2_route" "apigateway" {
  api_id    = aws_apigatewayv2_api.apigateway.id

  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.apigateway.id}"
}

resource "aws_lambda_permission" "apigateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.apigateway.execution_arn}/*/*/*"
  statement_id  = "AllowExecutionFromAPIGatewayV2"
}

resource "aws_apigatewayv2_stage" "apigateway" {
  api_id = aws_apigatewayv2_api.apigateway.id
  name = "$default"
  auto_deploy = true

  tags = local.common_tags

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.apigateway.arn
    format = jsonencode({ "requestId": "$context.requestId", "ip": "$context.identity.sourceIp", "requestTime": "$context.requestTime", "httpMethod": "$context.httpMethod", "routeKey": "$context.routeKey", "status": "$context.status", "protocol": "#context.protocol", "responseLength": "$context.responseLength" })
  }
}

resource "aws_cloudwatch_log_group" "apigateway" {
  name = "/aws/apigateway/${local.name}"

  tags = local.common_tags
}

