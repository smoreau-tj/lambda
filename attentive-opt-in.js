const fetch = require('node-fetch');
require('dotenv').config();

const url = `https://api.attentivemobile.com/v1/subscriptions`

const reqAttentive = async (requestOptions) => {
  try {
    const response = await fetch(url , requestOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('something went wrong: ', error)
  }
}

async function main(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${process.env.REACT_APP_ATTENTIVE_KEY}` ,
      'Content-Type': 'application/json'
    },
    body: {
      "user": {
        "phone": event.phone
      },
      "signUpSourceId": "103131"
    }
  };

  const data = await reqAttentive(requestOptions)
  
  let response = {
    statusCode: data.status,
    body : JSON.stringify(data)
  }

  return response
}



exports.handler = main