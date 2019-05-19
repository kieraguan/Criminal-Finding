import boto3
import json
from time import gmtime, strftime
import time
from requests_aws4auth import AWS4Auth
from datetime import datetime
import requests


def lambda_handler(event, context):
    key = event["body-json"]['input']

    # session = boto3.Session('AKIASEFOKXY63K2XAEID',
    #                          'g/jjhQAZeYvIDtW9Wtjp/wmA6hkQszM911TWd3aw')
    # s3 = session.resource('s3')                            
    # bucket = s3.Bucket('criminal-photos')
    # names=[]
    # for file in bucket.objects.all():
    #     names.append(file.key)
    client = boto3.client("rekognition")
    response = client.detect_faces(
        Image={
            'S3Object': {
                'Bucket': "likely-criminals",
                'Name': key,
            }
        },
        Attributes=[
            'ALL',
        ]
    )
    age_range = response["FaceDetails"][0]["AgeRange"]
    gender = response["FaceDetails"][0]["Gender"]["Value"].lower()
    document = {
        "query": {
            "term": {
                "sex": {
                    "value": gender
                }
            }
        }
    }
    
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
 
    response = requests.get(host + "/_search", auth=awsauth,
                            json=document, headers=headers)
    try:
        output = response.json()
    except ValueError:
        output = response.text
    names = [hit["_id"] + ".jpg" for hit in output['hits']["hits"]]
    # return gender, names, age_range
    simi = []
    for name in names:
        response = client.compare_faces(
            SourceImage={
                'S3Object': {
                    'Bucket': 'likely-criminals',
                    'Name': key
                }
            },
            TargetImage={
                'S3Object': {
                    'Bucket': 'criminal-photos',
                    'Name': name
                }
            },
            SimilarityThreshold=70
        )
        match = response['FaceMatches']
        simi_ = []
        for item in match:
            simi_.append(item['Similarity'])
        if simi_:
            simi.append(max(simi_))
        else: 
            simi.append(0)

    if simi:
        result = max(simi)
        ind = simi.index(result)
        userid = names[ind].split('.')[0]
        if result > 70:
            return 'We have found the best-matched criminal with ID number: ' + userid + ' Please report to the Chatbot!'
        else:
            return 'The photo you submit dose not match any criminal in our database, please try it again.' 
    else:
        return 'The photo you submit dose not match any criminal in our database, please try it again.' 
