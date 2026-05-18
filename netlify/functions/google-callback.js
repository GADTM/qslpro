exports.handler = async function(event){

    try{

        const code =
        event.queryStringParameters.code;

        if(!code){

            return{
                statusCode:400,
                body:"No se recibió CODE"
            };
        }

        // =========================
        // DATOS GOOGLE
        // =========================

        const clientId =
        process.env.GOOGLE_CLIENT_ID;

        const clientSecret =
        process.env.GOOGLE_CLIENT_SECRET;

        const redirectUri =
        'https://qslpro2.netlify.app/.netlify/functions/google-callback';

        // =========================
        // PEDIR TOKEN
        // =========================

        const params =
        new URLSearchParams();

        params.append('code', code);

        params.append('client_id', clientId);

        params.append('client_secret', clientSecret);

        params.append('redirect_uri', redirectUri);

        params.append('grant_type', 'authorization_code');

        const tokenResponse =
        await fetch(
            'https://oauth2.googleapis.com/token',
            {
                method:'POST',
                headers:{
                    'Content-Type':
                    'application/x-www-form-urlencoded'
                },
                body:params
            }
        );

        const tokenData =
        await tokenResponse.json();

        console.log(tokenData);

        return{

            statusCode:200,

            headers:{
                "Content-Type":
                "text/html; charset=utf-8"
            },

            body:`

            <html>

            <body style="
                font-family:Arial;
                background:#f0f0f0;
                text-align:center;
                padding-top:50px;
            ">

            <h2>
            ✅ Gmail conectado correctamente
            </h2>

            <p>
            TOKEN recibido correctamente
            </p>

            <h3>Access Token:</h3>

            <textarea style="
                width:80%;
                height:150px;
            ">${tokenData.access_token || 'NO TOKEN'}</textarea>

            </body>

            </html>
            `
        };

    }catch(error){

        return{

            statusCode:500,

            body:error.message
        };
    }
};
