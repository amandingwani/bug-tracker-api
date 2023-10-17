import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { GOOGLE_OAUTH_CLIENT_ID, JWT_SECRET } from '../config/env';

const client = new OAuth2Client();

async function verify(token: string) {
	// https://developers.google.com/identity/openid-connect/openid-connect
	const ticket = await client.verifyIdToken({
		idToken: token,
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

// login or register
export const login = async (req: Request, res: Response) => {
	try {
		const payload = await verify(req.body.token);
		if (payload) {
			if (payload.email && payload.given_name) {

				// console.log(payload);
				// if user already exits, just login, else register first then login
				let user = await prisma.user.findUnique({
					where: {
						google_id_sub: payload.sub
					}
				});
		
				// login
				if (user) {
					console.log(user);
					jwt.sign(user, JWT_SECRET, {} ,(err, token) => {
						if (err) throw err;
						res.cookie('token', token, {sameSite:'none', secure:true}).status(200).json({
							status: 'ok'
						});
					});
				}
				// register
				else {
					user = await prisma.user.create({
						data: {
							google_id_sub: payload.sub,
							email: payload.email,
							firstName: payload.given_name,
							lastName: payload.family_name,
							picture: payload.picture
						}
					});
					console.log(user);
					jwt.sign(user, JWT_SECRET, {} ,(err, token) => {
						if (err) throw err;
						res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
							status: 'ok'
						});
					});
				}
			}
		}
	}
	catch (error) {
		res.json({
			status: 'fail'
		})
		console.log(error);
	}
};
