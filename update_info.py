from requests_aws4auth import AWS4Auth
from datetime import datetime
import boto3
import requests


def lambda_handler(event, context):
    host = "https://vpc-criminals-nrgmq7rzyh7sxnvkjtgzyupi6m.us-east-1.es.amazonaws.com"
    index = 'criminals'
    typei = 'criminal'
    url = host + '/' + index + '/' + typei + '/'
    
    region = 'us-east-1'
    service = 'es'
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(
        credentials.access_key, 
        credentials.secret_key, 
        region, 
        service, 
        session_token=credentials.token
    )
    
    headers = {"Content-Type": "application/json"}
    
    if event["currentIntent"]["name"] == "GetCriminalInfo":
        slots = event['currentIntent']['slots']
        criminal_id = slots['id']
        location = slots['location']
        date = slots['date']
        time = slots['time']
        
        active_time = date + " " + time
        
        table = boto3.resource('dynamodb').Table("CriminalInfo")
        table.update_item(
            Key={
                "insertedTimeStamp": criminal_id
            },
            UpdateExpression="SET activeAreaTime = list_append(activeAreaTime, :newAreaTime)",
            ExpressionAttributeValues={
                ':newAreaTime': [{
                    "activeArea": location,
                    "activeTime": active_time
                }]
            },
            ReturnValues="UPDATED_NEW"
        )
        
        script = {
            "script": {
                "lang": "painless",
                "inline": "ctx._source.activeArea.add(params.area);ctx._source.activeTime.add(params.time)",
		        "params": {
		            "area": location,
		            "time": active_time 
		        }
            }
        }
        requests.post(url + criminal_id + "/_update", json=script, headers=headers, auth=awsauth)
        send_message=criminal_id+','+location+','+active_time
        sqs = boto3.resource('sqs',region_name='us-east-1')
        queue = sqs.get_queue_by_name(QueueName='criminal-update')
        response = queue.send_message(MessageBody=send_message)
        # match_all = {
        #     "query": 
        #         {
        #             "match_all": {}
        #         }
        # }
        # check =  requests.get(host + "/_search", auth=awsauth, json=match_all, headers=headers)
        # try:
        #     output = check.json()
        # except ValueError:
        #     output = check.text
        # return output
        
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "Thanks for your report!"
                }
            }
        }
   
    # document = {
    #     'objectKey': key,
    #     'bucket': bucket,
    #     'createdTimestamp': created_timestamp,
    #     'labels': ['person']
    # }
    # headers = {"Content-Type": "application/json"}

    # r = requests.put(url + id, auth=awsauth, json=document, headers=headers) # requests.get, post, and delete have similar syntax
    # try:
    #     output = r.json()
    # except ValueError:
    #     output = r.text
    # r2 =  requests.get(url + id, auth=awsauth, headers=headers)
    # try:
    #     output = r2.json()
    # except ValueError:
    #     output = r2.text
    # return output
