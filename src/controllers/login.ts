import { Request, Response } from 'express';
import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client();

async function verify(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	console.log(payload);
	const userid = payload?.sub;
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
  }

export const login = async (req: Request, res: Response) => {
	await verify(req.body.token).catch(console.error);
	
	
	res.json({
		test: 'ok'
	});
};
