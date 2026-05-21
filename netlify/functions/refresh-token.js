exports.handler = async function(event){

    try{

        const body =
        JSON.parse(event.body);

        const refreshToken =
        body.refresh_token;

        if(!refreshToken){

            return{
                statusCode:400,
                body:JSON.stringify({
                    error:'No refresh token'
                })
            };
        }

        const params =
        new URLSearchParams();

        params.append(
            'client_id',
            process.env.GOOGLE_CLIENT_ID
        );

        params.append(
            'client_secret',
            process.env.GOOGLE_CLIENT_SECRET
        );

        params.append(
            'refresh_token',
            refreshToken
        );

        params.append(
            'grant_type',
            'refresh_token'
        );

        const response =
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

        const data =
        await response.json();

        return{

            statusCode:200,

            body:JSON.stringify(data)
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
