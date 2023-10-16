import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import prisma from '../db';

const client = new OAuth2Client();

async function verify(token: string) {
	// https://developers.google.com/identity/openid-connect/openid-connect
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	console.log(payload);
	// const userid = payload?.sub;
	// // If request specified a G Suite domain:
	// // const domain = payload['hd'];
	return payload;
}

// login or register
export const login = async (req: Request, res: Response) => {
	try {
		const payload = await verify(req.body.token);
		if (payload) {
			if (payload.email && payload.given_name) {

				// console.log(payload);
				// if user already exits, just login, else register first then login
				const user = await prisma.user.findUnique({
					where: {
						google_id_sub: payload.sub
					}
				});
		
				// login
				if (user) {
					console.log(user);
				}
				// register
				else {
					await prisma.user.create({
						data: {
							google_id_sub: payload.sub,
							email: payload.email,
							firstName: payload.given_name,
							lastName: payload.family_name,
							picture: payload.picture
						}
					});
					console.log('registered');
				}
		
				res.json({
					login: 'ok'
				});
			}
		}
	}
	catch (error) {
		res.json({
			login: 'fail'
		})
		console.log(error);
	}
};
