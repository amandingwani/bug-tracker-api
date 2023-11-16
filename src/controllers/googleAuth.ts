import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { getTokens, verifyIdToken } from '../services/google'
import { JWT_SECRET } from '../config/env';

// login or register
export const googleAuth = async (req: Request, res: Response) => {
	try {
		const tokens = await getTokens(req.body.code);
		if (tokens.id_token) {
			const payload = await verifyIdToken(tokens.id_token);
			if (payload) {
				if (payload.email && payload.given_name) {

					// if user already exits, just login, else register first then login
					let user = await prisma.user.findUnique({
						where: {
							google_id_sub: payload.sub
						}
					});

					// login
					if (user) {
						jwt.sign(user, JWT_SECRET, {}, (err, token) => {
							if (err) throw err;
							res.cookie('token', token, { sameSite: 'none', secure: true })
								.status(200)
								.json(user);
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
						console.log({ user });
						jwt.sign(user, JWT_SECRET, {}, (err, token) => {
							if (err) throw err;
							res.cookie('token', token, { sameSite: 'none', secure: true })
								.status(201)
								.json(user);
						});
					}
				}
			}
		}
	}
	catch (error) {
		res.json({
			id: null,
			google_id_sub: null,
			email: null,
			firstName: null,
			lastName: null,
			picture: null,
		})
		console.log(error);
	}
};
