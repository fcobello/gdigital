var request = require('request');

exports.handler =  function(event, context, callback) {
    
    let API_KEY = process.env.API_KEY;
    let FORM_ID = process.env.FORM_ID;
    
    const req = {
        nome: event.name,
        email: event.email,
        id_form: FORM_ID,
        telefone: event.phoneNumber,
        clientListingId: event.clientListingId,
        leadOrigin: event.leadOrigin,
        timestamp: event.timestamp,
        originLeadId: event.originLeadId,
        originListingId: event.originListingId,
        ddd: event.ddd,
        message: event.message
    };
    
    const options = 
    {
        url: 'https://api.gdigital.com.br/lead',
        rejectUnauthorized: false,
        body: req,
        headers: {
            'Authorization': API_KEY
        },
        method: 'POST',
        json: true
    };
    

    console.log('Request: ' + JSON.stringify(options));
    console.log('Prepare Request to: ' + options.url);
    request(options, function (err, res, body)
    {
        //handleResponse(err, res, body);
        console.log('HandleResponse');
    
    if(err)
    {
        console.log('ERROR', err);
        let responseBody = 
        {
            errorCode: 500,
            errorMessage: err.message
        };
        let response = 
        {
            statusCode: 500,
            body: JSON.stringify(responseBody)
        };
        return response;
    }
    else
    {
        console.log('SUCESS');
        //Zera o Header set-cookie, pois causa Lambda Malformation no response
        res.headers['set-cookie'] = '';
        let response = 
        {
            statusCode: res.statusCode,
            headers: res.headers,
            body: body
        };

        console.log(response);
        return response;
    }
    });
};