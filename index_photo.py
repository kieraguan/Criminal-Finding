from requests_aws4auth import AWS4Auth
from datetime import datetime
from time import gmtime, strftime
import boto3
import requests
import json

def lambda_handler(event, context):
    headers = {"Content-Type": "application/json"}
    
    host = 'https://vpc-photos-ixv5vs7vpdl677mmclfv4zl77u.us-east-1.es.amazonaws.com'
    index = 'photos'
    typei = 'photo'
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
    
    for record in event['Records']:
        created_timestamp = strftime("%Y-%m-%dT%H:%M:%S", gmtime())
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
    
        client = boto3.client('rekognition')
        result = client.detect_labels(
            Image={
                'S3Object': {
                    'Bucket': bucket,
                    'Name': key,
                },
            },
            MaxLabels=5,
            MinConfidence=75,
        )
        labels = [label["Name"].lower() for label in result["Labels"]]
        
        document = {
            'objectKey': key,
            'bucket': bucket,
            'createdTimestamp': created_timestamp,
            'labels': labels
        }
        
        # put the new photo index
        requests.put(url + created_timestamp, auth=awsauth, json=document, headers=headers) 
        
        # delete the index
    # requests.delete(host+"/photos", auth=awsauth)
        
    #     #check the document in index
    # query = json.dumps({
    #     "query": 
    #         {
    #             "match_all": { 
                    
    #             }
    #         }
    # }) 
    # # query = json.dumps({
    # #     "size": 3,
    # #     "query": {
    # #         "function_score": {
    # #             "query": {
    # #                 "match": {
    # #                     'labels':'cat'
        
    # #                 }
    # #             },
    # #             "functions": [
    # #                 {
    # #                     "random_score": {}
    # #                 }
    # #             ]
    # #         }
    # #     }
    # # })
    # # #check =  requests.get(host+"/_search", auth=awsauth, json=match_all, headers=headers)
    # check =  requests.get(url+"_search", auth=awsauth, data=query, headers=headers)
    # final=[]
    # try:
    #     #output = check.json()
    #     output=json.loads(check.text)
    # except ValueError:
    #     output = check.text
    # return output
    # name=output['hits']['hits']
    # for ob in name:
    #     result=ob['_source']['objectKey']
    #     final.append(result)
    # return ' '.join(final)
