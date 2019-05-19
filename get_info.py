import json
import boto3

def lambda_handler(event, context):
    client = boto3.client('lex-runtime')
    return client.post_text(
        botName='FindCriminal', 
        botAlias='FC', 
        userId='1463-9449-6573', 
        inputText=event['body-json']['myMessage'])['message']
