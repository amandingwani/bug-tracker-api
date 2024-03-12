import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';
import { getTokens, verifyIdToken } from '../services/google';
import { JWT_SECRET } from '../config/env';

// login or register
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const tokens = await getTokens(req.body.code);
    if (tokens.id_token) {
      const payload = await verifyIdToken(tokens.id_token);
      if (payload) {
        if (payload.email && payload.given_name) {
          // checking for user in db
          let user = await prisma.user.findUnique({
            where: {
              email: payload.email,
            },
          });

          // if user already exists
          if (user) {
            let newlyRegistered = false;
            // if user is unregistered, update the user
            if (!user.registered) {
              user = await prisma.user.update({
                where: {
                  email: payload.email,
                },
                data: {
                  registered: true,
                  google_id_sub: payload.sub,
                  firstName: payload.given_name,
                  lastName: payload.family_name,
                  picture: payload.picture,
                  createdAt: new Date(),
                },
              });
              newlyRegistered = true;
            }

            // login
            jwt.sign(user, JWT_SECRET, {}, (err, token) => {
              if (err) throw err;
              res
                .cookie('token', token, { sameSite: 'none', secure: true })
                .status(newlyRegistered ? 201 : 200)
                .json(user);
            });
          }
          // else register first then login
          else {
            user = await prisma.user.create({
              data: {
                google_id_sub: payload.sub,
                email: payload.email,
                firstName: payload.given_name,
                lastName: payload.family_name,
                picture: payload.picture,
              },
            });
            console.log('User registered:');
            console.log({ user });
            jwt.sign(user, JWT_SECRET, {}, (err, token) => {
              if (err) throw err;
              res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json(user);
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(googleAuth.name);
    console.log({ error });
    res.status(500).json({ error: error });
  }
};
