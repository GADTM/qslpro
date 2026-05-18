exports.handler = async function(){

    try{

        const clientId =
        process.env.GOOGLE_CLIENT_ID;

        const redirectUri =
        'https://qslpro2.netlify.app/.netlify/functions/google-callback';

        const scope =
        encodeURIComponent(
            'https://www.googleapis.com/auth/gmail.send'
        );

        const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

        return{

            statusCode:200,

            body:JSON.stringify({

                url:authUrl

            })
        };

    }catch(error){

        return{

            statusCode:500,

            body:JSON.stringify({

                error:error.message

            })
        };
    }
};