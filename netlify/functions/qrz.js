exports.handler = async function(event) {

    try {

        const call =
        event.queryStringParameters.call;

        if(!call){

            return {
                statusCode:400,
                body:JSON.stringify({
                    error:'Falta CALL'
                })
            };
        }

        // =========================
        // LOGIN QRZ
        // =========================

        const loginUrl =
        `https://xmldata.qrz.com/xml/current/?username=${process.env.QRZ_USER};password=${process.env.QRZ_PASS}`;

        const loginResponse =
        await fetch(loginUrl);

        const loginText =
        await loginResponse.text();

        // EXTRAER SESSION KEY

        const keyMatch =
        loginText.match(/<Key>(.*?)<\/Key>/);

        if(!keyMatch){

            return {
                statusCode:500,
                body:JSON.stringify({
                    error:'Error login QRZ'
                })
            };
        }

        const sessionKey =
        keyMatch[1];

        // =========================
        // CONSULTA CALLSIGN
        // =========================

        const queryUrl =
        `https://xmldata.qrz.com/xml/current/?s=${sessionKey};callsign=${call}`;

        const queryResponse =
        await fetch(queryUrl);

        const queryText =
        await queryResponse.text();

        // EXTRAER EMAIL

        const emailMatch =
        queryText.match(/<email>(.*?)<\/email>/i);

        const email =
        emailMatch ? emailMatch[1] : '';

        return {

            statusCode:200,

            body:JSON.stringify({

                callsign:call,

                email:email

            })
        };

    } catch(err){

        return {

            statusCode:500,

            body:JSON.stringify({

                error:err.message

            })
        };
    }
};