import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({error: 'NOT_FOUND'});
};

export default notFoundHandler;