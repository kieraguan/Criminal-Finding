import json
import boto3
def lambda_handler(event, context): 
    sqs_client = boto3.client('sqs', region_name='us-east-1')

    response = sqs_client.receive_message( 
        QueueUrl='https://sqs.us-east-1.amazonaws.com/146394496573/criminal-update')
    input = response['Messages'][0]['Body']
    input=input.split(',')
    key=input[0]
    location=input[1]
    time=input[2]
    handler = response['Messages'][0]['ReceiptHandle']
    
    emails=[]
    client = boto3.client('cognito-idp')
    response = client.list_users(
        UserPoolId='us-east-1_dn7Ymz4qr',
        AttributesToGet=['email']
    )
    users=response['Users']
    for user in users:
        try: 
            email=user['Attributes'][0]['Value']
        except:
            email=user['Attributes'][0]['Value']
        else:
            emails.append(email)
   
    # records=event['Records'] 
    
    client= boto3.client('ses')   
    # item=records[0]
    # try:
    #     key=item['dynamodb']['NewImage']['insertedTimeStamp']['S'] 
    # except:
    #     key=item['dynamodb']['NewImage']['insertedTimeStamp']['S']
    # else:
            
    #     key=item['dynamodb']['NewImage']['insertedTimeStamp']['S'] 
    #     name=item['dynamodb']['NewImage']['name']['S']
        
    #     tmp=item['dynamodb']['NewImage']['activeAreaTime']['L']  
    #     length=len(tmp) 
        # if length>1: 
    # location=tmp[-1]['M']['activeArea']['S']
    # time=tmp[-1]['M']['activeTime']['S']  
    # key=input[0]
    # location=input[1]
    # time=input[2]
    response = client.send_email(
        
        Source='tg2663@columbia.edu',
        Destination={
            'ToAddresses': ['kieraguan@hotmail.com']    
        },
        Message={
            'Subject': { 
                'Data': 'Criminal with ID '+key +' is reported',
                'Charset': 'UTF-8'
            },
            'Body': {
                'Text': {  
                    'Data': 'Criminal named with ID number '+ key+ ' has shown up in '+location+' at '+time,    
                    'Charset': 'UTF-8'
                }
            }
        }, 
        
    ) 
    sqs_client.delete_message(
        QueueUrl='https://sqs.us-east-1.amazonaws.com/146394496573/criminal-update',
        ReceiptHandle=handler)
    return response 
         
