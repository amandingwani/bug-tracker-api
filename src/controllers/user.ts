// import { Request, Response } from 'express';
// import prisma from '../db';

// // add user by email if the user does not exist
// export const addUserByEmail = async (req: Request, res: Response) => {
//     try {
//         const user = await prisma.user.create({
//             data: {
//                 registered: false,
//                 email: res.locals.parsedData.email,
//                 firstName: res.locals.parsedData.email.split('@')[0],
//             },
//         });
//         res.json(user);
//     }
//     catch (error) {
//         res.status(500).json({ error: error });
//     }
// };
