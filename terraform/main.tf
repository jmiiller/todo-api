terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

module "dynamo" {
  source = "./dynamo"
}

locals {
  name = "todo-api"

  common_tags = tomap({
    module = "todo-api"
    version = "0.0.1"
  })
}