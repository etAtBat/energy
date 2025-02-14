import json
import boto3
from decimal import Decimal

convert_to_decimal = lambda x: Decimal(str(x)) if isinstance(x, float) else x

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('energy-app-db')

def lambda_handler(event, context):
  converted_data = {k: convert_to_decimal(v) for k, v in event.items()}
  try:
    response=table.put_item(Item=converted_data)
    return table.scan()
  except:
    raise 
 