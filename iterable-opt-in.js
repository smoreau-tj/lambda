const fetch = require('node-fetch');

exports.handler = async (event) => {
    let userEmail = event.userEmail;
    let error;
    const apiKey = process.env.apiKey;
    let iterableApiResponse;
    let url = 'https://api.iterable.com/api/events/track?apiKey='+apiKey;
    let iterableData = {
        "email": userEmail,
        "eventName": "OptedIn"
      };

    async function sendToIterable(url = '', data = {}) {
        try {
             const response = await fetch(url, {
                  method: 'POST',
                  body: JSON.stringify(data) 
                });
                const responseFromIterable = await response.json()
                return responseFromIterable;

        } catch (err) {
            error = err
        }
    }

    iterableApiResponse = await sendToIterable(url, iterableData);
    const response = {
        userEmail,
        iterableApiResponse,
        error
    };

    console.log('response == ',  response);
    return response;

};