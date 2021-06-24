const fetch = require('node-fetch');

exports.handler = async (event) => {
    let statusCode;
    let userEmail = event.userEmail;
    let email = '';
    let subscriptionGroupId = event.subscriptionGroupId;
    let error;
    const subscriptionGroup = "messageType";
    const apiKey = process.env.apiKey;
    let responseFromIterable;
    let iterableErrorMsg = '';
    let iterableErrorCode = '';
    let validateErrorMsg = '';
    let url = `https://api.iterable.com/api/subscriptions/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`;

    if (userEmail == null || undefined && subscriptionGroupId == null || undefined) {
        statusCode = 400;
        validateErrorMsg = "Neither Email nor Subscription Group Id was provided";
    } else if (userEmail == null || undefined || userEmail == '') {
        statusCode = 400;
        validateErrorMsg = "No email was provided";
    } else if (subscriptionGroupId == null || undefined || subscriptionGroupId == '') {
        statusCode = 400;
        validateErrorMsg = "No Subscription Group Id was provided";
    } else {
        statusCode = 200
        responseFromIterable = await sendToIterable(url);
        iterableErrorMsg = responseFromIterable.msg;
        iterableErrorCode = responseFromIterable.code;
        if (iterableErrorCode == 'Success') {
          email = userEmail
        } else {
          email = '';
        }
    }

    async function sendToIterable(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'api-key': apiKey
                }
            });
            const data = await response.json()
            const sendIterbaleResponse = {
                msg: data.msg,
                code: data.code
            };
            return sendIterbaleResponse;

        } catch (err) {
            error = err
        }
    }
    const response = {
        statusCode,
        validateErrorMsg,
        email,
        iterableErrorMsg,
        iterableErrorCode,
        error
    };
    return response;

};