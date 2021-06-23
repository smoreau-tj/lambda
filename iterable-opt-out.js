const fetch = require('node-fetch');

exports.handler = async (event) => {
    // TODO implement
    let body = event
    let statusCode
    let userEmail = event.userEmail
    let subscriptionGroupId = event.subscriptionGroupId
    let error
    const subscriptionGroup = "messageType"
    const apiKey = event.apiKey
    let url = `https://api.iterable.com/api/subscriptions/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`
    console.log(url);
    if(userEmail == null || undefined && event.subscriptionGroupId == null || undefined ) {
        statusCode = 400
         body = "No Email was provided"
     } else {
        statusCode = 200
        body = userEmail
        sendToIterable(url)
     }
    async function sendToIterable (url) {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-type': 'application/json',
              'api-key': apiKey
          }
        });
        const data = await response.json()
        console.log(data);
      }catch(err) { error = err }
        
    }
    const response = {
        statusCode,
        body: JSON.stringify(body),
        error 
    };
    return response;
};