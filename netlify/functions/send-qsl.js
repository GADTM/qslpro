exports.handler = async function(event){

    try{

        const body =
        JSON.parse(event.body);

        const accessToken =
        body.token;

        const to =
        body.to;

        const imageBase64 =
        body.image;

        // =========================
        // EMAIL MIME
        // =========================

        const boundary =
        "qslproboundary";

        const emailLines = [

            `To: ${to}`,

            'Subject: QSL Confirmation',

            'MIME-Version: 1.0',

            `Content-Type: multipart/mixed; boundary="${boundary}"`,

            '',

            `--${boundary}`,

            'Content-Type: text/plain; charset="UTF-8"',

            '',

            `Estimado/a,

				Es un placer confirmar nuestro QSO.
				Adjunto encontrarás mi QSL digital.

				Gracias por el contacto.

				73's cordiales.


			Dear OM/YL,

				It is a pleasure to confirm our QSO.
				Attached you will find my digital QSL card.

				Thank you for the contact.

				Best 73's.`,

            '',

            `--${boundary}`,

            'Content-Type: image/png; name="qsl.png"',

            'Content-Transfer-Encoding: base64',

            'Content-Disposition: attachment; filename="qsl.png"',

            '',

            imageBase64.split(',')[1],

            '',

            `--${boundary}--`

        ];

        const email =
        emailLines.join('\n');

        // =========================
        // BASE64 URL SAFE
        // =========================

        const encodedEmail =
        Buffer
        .from(email)
        .toString('base64')
        .replace(/\+/g,'-')
        .replace(/\//g,'_')
        .replace(/=+$/,'');

        // =========================
        // ENVIAR GMAIL
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

        // =========================
        // RESPUESTA GMAIL
        // =========================

        const text =
        await response.text();

        return{

            statusCode:200,

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                gmailResponse:text

            })
        };

    }catch(error){

        return{

            statusCode:500,

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                error:error.message

            })
        };
    }
};