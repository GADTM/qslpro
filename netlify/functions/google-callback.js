exports.handler = async function(event){

    try{

        const code =
        event.queryStringParameters.code;

        if(!code){

            return{

                statusCode:400,

                body:"No se recibió código OAuth"
            };
        }

        return{

            statusCode:200,

            headers:{
                "Content-Type":"text/html"
            },

            body:`
            <html>
            <body style="
                font-family:Arial;
                text-align:center;
                padding-top:50px;
                background:#f0f0f0;
            ">

            <h2>✅ Gmail conectado correctamente</h2>

            <p>
            OAuth funcionando OK
            </p>

            <p>
            Código recibido:
            </p>

            <textarea style="
                width:80%;
                height:120px;
            ">${code}</textarea>

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