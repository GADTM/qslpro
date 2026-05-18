exports.handler = async function(event){

    try{

        // =========================
        // TOKEN COPIADO
        // =========================

        const accessToken =
        'ya29.a0AQvPyIP3XulA2lBFtPND5P7bPV2MJ6MbhUbTJ5dzTROzf9Dt0ZhV0_be8reVpiY65BVJN80JvJIc-awUbUcVIc4U-32Ksif9C6X3xbFIRVaWzKfmylsXsNvJsdH7M0FYM4pT9PMH9SDijjypXTyFntarDGGbcCaUVu3z0u-4fU-9fuxhb80jjTnB5EzmBOu2ACafkmoaCgYKAW8SARUSFQHGX2MiCXFFgI8gSTTem7xdPAQRIw0206';

        // =========================
        // EMAIL DESTINO
        // =========================

        const to =
        'valvulin@gmail.com';

        // =========================
        // CONTENIDO EMAIL
        // =========================

        const subject =
        'Prueba QSL PRO';

        const message =
        'Hola, este es un email de prueba enviado desde QSL PRO usando Gmail API.';

        // =========================
        // FORMATO GMAIL
        // =========================

        const email =
        [
            `To: ${to}`,
            'Content-Type: text/plain; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${subject}`,
            '',
            message
        ].join('\n');

        // BASE64 URL SAFE

        const encodedEmail =
        Buffer
        .from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

        // =========================
        // ENVIAR GMAIL API
        // =========================

        const response =
        await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
            {
                method:'POST',

                headers:{
                    Authorization:
                    `Bearer ${accessToken}`,

                    'Content-Type':
                    'application/json'
                },

                body:JSON.stringify({
                    raw:encodedEmail
                })
            }
        );

        const data =
        await response.json();

        return{

            statusCode:200,

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify(data)
        };

    }catch(error){

        return{

            statusCode:500,

            body:error.message
        };
    }
};