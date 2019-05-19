function citizenSignUp(form) {
    let name = form.name.value;
    let id = form.id.value;
    let phone = form.phone.value;
    let email = form.email.value;
    let password = form.password.value;
    let check = form.check.value;

    sessionStorage.setItem("citizen-email", email);
    sessionStorage.setItem("citizen-password", password);

    if (password != check) {
        alert("The passwords are not consistent!");
        return false
    }

    var poolData = {
        UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
        ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataName = {
        Name: 'name',
        Value: name
    };
    var dataId = {
        Name: 'custom:ID',
        Value: id
    };
    var dataEmail = {
        Name: 'email',
        Value: email
    };
    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone
    };

    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    var attributeId = new AmazonCognitoIdentity.CognitoUserAttribute(dataId);
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeName);
    attributeList.push(attributeId);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(email, password, attributeList, null, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        window.location.href = "citizen.html";
    });
}

function citizenSignIn(form) {
    let email = form.email.value;
    let password = form.password.value;

    sessionStorage.setItem("citizen-email", email);
    sessionStorage.setItem("citizen-password", password);

    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
        ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            window.location.href = "citizen.html";
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

    });
}


function officialSignIn(form) {
    let username = form.username.value;
    let password = form.password.value;

    sessionStorage.setItem("official-username", username);
    sessionStorage.setItem("official-password", password);

    var authenticationData = {
        Username: username,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: 'us-east-1_dn7Ymz4qr', // Your user pool id here
        ClientId: '3g9b6rv92l93c3m1mq89csv4pl' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            window.location.href = "official.html";
        },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

    });
}
// function comparPhoto(){
//     let insertedTimeStamp = new Date().getTime().toString()
//     email = sessionStorage.getItem("citizen-email");
//     password = sessionStorage.getItem("citizen-password");

//     var poolData = {
//         UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
//         ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
//     };
//     var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
//     var authenticationData = {
//         Username: email,
//         Password: password,
//     };
//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
//     var userData = {
//         Username: email,
//         Pool: userPool
//     };
//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function(result) {
//             var accessToken = result.getAccessToken().getJwtToken();
//             AWS.config.region = 'us-east-1';

//             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: 'us-east-1:4315fb1b-700a-4c17-927d-0d0190dc1163', // your identity pool id here
//                 Logins: {
//                     // Change the key below according to the specific region your user pool is in.
//                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_zK7VBYV4m': result.getIdToken().getJwtToken()
//                 }
//             });
//             AWS.config.credentials.refresh((error) => {
//                 if (error) {
//                     console.error(error);
//                 } else {

//                 }
//             });
//         },
//     });
// }
function sendImages(){
    document.getElementById('output').textContent= 'Image uploading ...'
    console.log('enter function')
    let insertedTimeStamp = new Date().getTime().toString()
    email = sessionStorage.getItem("citizen-email");
    password = sessionStorage.getItem("citizen-password");

    var poolData = {
        UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
        ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:4315fb1b-700a-4c17-927d-0d0190dc1163', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_zK7VBYV4m': result.getIdToken().getJwtToken()
                }
            });
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    var s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        params: { Bucket: "likely-criminals" }
                    });
                    var files = document.getElementById('img_input').files;
                    if (!files.length) {
                        return alert('Please choose a file to upload first.');
                    }
                    var file = files[0];
                    var fileName = insertedTimeStamp + ".jpg";
                    
                    s3.upload({
                        Key: fileName, // the storage path of the file 
                        Body: file,
                        ACL: 'public-read'
                    }, function(err, data) {
                        if (err) {
                            return alert('There was an error uploading your photo: ', err.message);
                        }
                    });
                    
                
                    console.log('start comparison')
                    document.getElementById('output').textContent= 'Image uploading complete! Waiting for comparison.'
                    let accessKeyId = AWS.config.credentials.accessKeyId;
                    let secretAccessKey = AWS.config.credentials.secretAccessKey;
                    let sessionToken = AWS.config.credentials.sessionToken;

                    var apigClient = apigClientFactory.newClient({
                        accessKey: accessKeyId,
                        secretKey: secretAccessKey,
                        sessionToken: sessionToken,
                    });
                    var params = {};
                    var body = {"input":fileName,};
                    var additionalParams = {};
                    setTimeout(function(){
                        apigClient.criminalRecognitionPost(params, body, additionalParams)
                            .then(function(result) {
                                // alert("Upload successfully!")
                                document.getElementById('output').textContent= result.data
                            }).catch(function(result) {
                                alert("Error!")
                            });
                    },20000)
                    console.log('finishinging....')
                    // setTimeout(function(){ 
                    //     s3.deleteObject({Key:"result.txt"}, function(err, data) {
                    //         if (err) console.log(err, err.stack); // an error occurred
                    //         else     console.log(data);  
                    //     });
                    // },1000)
                }
            });
        },
    });
}
function startcomp(){
    
    let insertedTimeStamp = new Date().getTime().toString()
    email = sessionStorage.getItem("citizen-email");
    password = sessionStorage.getItem("citizen-password");

    var poolData = {
        UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
        ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:4315fb1b-700a-4c17-927d-0d0190dc1163', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_zK7VBYV4m': result.getIdToken().getJwtToken()
                }
            });
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    var s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        params: { Bucket: "likely-criminals" }
                    });
                    document.getElementById('output').textContent= 'Please wait ...'
                    
                    setTimeout(function(){ 

                        s3.getObject(
                            { Key: "result.txt" },
                            function (error, data) {
                                if (error != null) {
                                document.getElementById('output').textContent= 'The photo you submit dose not match any criminal in our database, please try it again.'
                                } else {
                                document.getElementById('output').textContent= 'We have found the best-matched criminal with ID number: '+data.Body+' Please report to the Chatbot!'
                                // do something with data.Body
                                }
                            }
                            );
                    }, 40000)
                    
                    setTimeout(function(){ 
                        s3.deleteObject({Key:"result.txt"}, function(err, data) {
                            if (err) console.log(err, err.stack); // an error occurred
                            else     console.log(data);  
                        });
                    },10000)
                }
            });
        },
    });
}
function sendMessage() {
    let input = document.getElementsByClassName("message-input")[0];
    let inputValue = input.value;
    input.value = "";

    email = sessionStorage.getItem("citizen-email");
    password = sessionStorage.getItem("citizen-password");

    var poolData = {
        UserPoolId: 'us-east-1_zK7VBYV4m', // Your user pool id here
        ClientId: '7ud23rkn3chei96hj8v2mabkqv' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var authenticationData = {
        Username: email,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: email,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:4315fb1b-700a-4c17-927d-0d0190dc1163', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_zK7VBYV4m': result.getIdToken().getJwtToken()
                }
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let accessKeyId = AWS.config.credentials.accessKeyId;
                    let secretAccessKey = AWS.config.credentials.secretAccessKey;
                    let sessionToken = AWS.config.credentials.sessionToken;

                    var apigClient = apigClientFactory.newClient({
                        accessKey: accessKeyId,
                        secretKey: secretAccessKey,
                        sessionToken: sessionToken,
                    });
                    

                    
                    var myContent = document.createElement('div');
                    myContent.innerHTML = inputValue;
                    myContent.className = "self";

                    var myNewMessage = document.createElement("div");
                    myNewMessage.appendChild(myContent);
                    myNewMessage.className = "chat-message";

                    var messages = document.getElementsByClassName("messages")[0];
                    messages.appendChild(myNewMessage);

                    messages.scrollTop = messages.scrollHeight;

                    var params = {};
                    var body = {
                        "myMessage": inputValue
                    };
                    var additionalParams = {};
                    apigClient.chatbotPost(params, body, additionalParams)
                        .then(function(result) {
                            var botContent = document.createElement("div");
                            botContent.innerHTML = result.data;
                            botContent.className = "bot";

                            var botNewMessage = document.createElement('div');
                            botNewMessage.appendChild(botContent);
                            botNewMessage.className = "chat-message";

                            messages.appendChild(botNewMessage);
                            messages.scrollTop = messages.scrollHeight;
                        }).catch(function(result) {
                            alert("error");
                        });
                }
            });
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
}

function uploadCriminal(form) {
    let name = form.name.value;
    let sex = form.sex.value.toLowerCase();
    let age = form.age.value;
    let activeArea = form.activeArea.value;
    let activeTime = form.activeTime.value;
    let otherDetail = form.otherDetail.value;

    let sexChoices = new Set(['male', 'female']);
    let ageRange = [0, 100];

    if (!sexChoices.has(sex))
        return alert("Sex must be male or female!");
    if (age < ageRange[0] || age > ageRange[1])
        return alert("Age must be in [0, 100]!");
    if (otherDetail == "")
        otherDetail = "N/A";

    username = sessionStorage.getItem("official-username");
    password = sessionStorage.getItem("official-password");

    var poolData = {
        UserPoolId: 'us-east-1_dn7Ymz4qr', // Your user pool id here
        ClientId: '3g9b6rv92l93c3m1mq89csv4pl' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var authenticationData = {
        Username: username,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:4315fb1b-700a-4c17-927d-0d0190dc1163', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_dn7Ymz4qr': result.getIdToken().getJwtToken()
                }
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let insertedTimeStamp = new Date().getTime().toString();

                    var s3 = new AWS.S3({
                        apiVersion: '2006-03-01',
                        params: { Bucket: "criminal-photos" }
                    });

                    var files = document.getElementById('img_input_database').files;
                    if (!files.length) {
                        return alert('Please choose a file to upload first.');
                    }
                    var file = files[0];
                    var fileName = insertedTimeStamp + ".jpg";

                    s3.upload({
                        Key: fileName, // the storage path of the file 
                        Body: file,
                        ACL: 'public-read'
                    }, function(err, data) {
                        if (err) {
                            return alert('There was an error uploading your photo: ', err.message);
                        }
                    });

                    // Create the DynamoDB service object
                    var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

                    var params = {
                        TableName: 'CriminalInfo',
                        Item: {
                            'insertedTimeStamp': { S: insertedTimeStamp },
                            'name': { S: name },
                            'sex': { S: sex },
                            'age': { N: age },
                            'activeAreaTime': {
                                L: [{
                                    M: {
                                        "activeArea": { S: activeArea },
                                        "activeTime": { S: activeTime }
                                    }
                                }]
                            },
                            'otherDetail': { S: otherDetail }
                        }
                    };

                    // Call DynamoDB to add the item to the table
                    ddb.putItem(params, function(err, data) {
                        if (err) {
                            console.log("Error", err);
                        } else {
                            console.log("Success", data);
                        }
                    });

                    // index the criminals in elastic search
                    let accessKeyId = AWS.config.credentials.accessKeyId;
                    let secretAccessKey = AWS.config.credentials.secretAccessKey;
                    let sessionToken = AWS.config.credentials.sessionToken;

                    var apigClient = apigClientFactory.newClient({
                        accessKey: accessKeyId,
                        secretKey: secretAccessKey,
                        sessionToken: sessionToken,
                    });

                    var params = {};
                    var body = {
                        "insertedTimeStamp": insertedTimeStamp,
                        "name": name,
                        "sex": sex,
                        "age": age,
                        "activeArea": activeArea,
                        "activeTime": activeTime,
                    };
                    var additionalParams = {};
                    apigClient.indexcriminalsPost(params, body, additionalParams)
                        .then(function(result) {
                            // alert("Upload successfully!")
                            window.location.href = "thanks.html";
                        }).catch(function(result) {
                            alert("Error!")
                        });
                }
            });
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },
    });
}