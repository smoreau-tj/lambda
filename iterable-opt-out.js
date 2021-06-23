const fetch = require('node-fetch');

exports.handler = async (event) => {
    // TODO implement
    let body = event
    let statusCode
    //let { userEmail, subscriptionGroupId } = { userEmail, subscriptionGroupId, ...event }
    let error
    const subscriptionGroup = "messageType"
    //let url = `https://api.iterable.com/api/subscriptions/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`
    // if(event.email == null || undefined && event.subscriptionGroupId == null || undefined ) {
    //     statusCode = 400
    //     body = "No Email was provided"
    // } else {
    //     statusCode = 200
    //     body = event.email
    // }
    async function sendToIterable (params) {
      try {
        // const response = await fetch(url)
        // const data = await response.json()
      }catch(err) { error = err }
        
    }
    const response = {
        statusCode,
        body: JSON.stringify(body),
        error 
    };
    return response;
};