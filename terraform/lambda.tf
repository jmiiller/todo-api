resource "aws_lambda_function" "lambda" {
  function_name    = local.name
  role             = aws_iam_role.lambda.arn

  filename         = "todo_api.zip"
  source_code_hash = filebase64sha256("todo_api.zip")
  handler          = "dist/lambda.handler"

  runtime          = "nodejs14.x"
  publish          = true
  tags             = local.common_tags

  environment {
    variables = {
      DDB_TABLE_NAME = var.ddb_table_name
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda" {
  name = "/aws/lambda/${local.name}"
  tags = local.common_tags
}

resource "aws_iam_role" "lambda" {
  name = local.name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

data "aws_iam_policy" "dynamo_db_full_access" {
  arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

data "aws_iam_policy" "cloudwatch_full_access" {
  arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}

resource "aws_iam_role_policy_attachment" "attach_ddb_policy" {
  role       = aws_iam_role.lambda.name
  policy_arn = data.aws_iam_policy.dynamo_db_full_access.arn
}

resource "aws_iam_role_policy_attachment" "attach_cloudwatch_policy" {
  role       = aws_iam_role.lambda.name
  policy_arn = data.aws_iam_policy.cloudwatch_full_access.arn
}
