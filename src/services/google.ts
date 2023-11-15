import { OAuth2Client } from 'google-auth-library';

import { CLIENT_URL, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET } from '../config/env';

const client = new OAuth2Client(
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    CLIENT_URL
);

export async function getTokens(code: string) {
    const { tokens } = await client.getToken(code); // exchange code for tokens
    return tokens;
}

export async function verifyIdToken(id_token: string) {
    // https://developers.google.com/identity/openid-connect/openid-connect
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // console.log(payload);
    // const userid = payload?.sub;
    // // If request specified a G Suite domain:
    // // const domain = payload['hd'];
    return payload;
}