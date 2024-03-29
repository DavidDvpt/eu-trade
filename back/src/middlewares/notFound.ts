import { Request, Response } from 'express';

function notFound(req: Request, res: Response, next: any) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}

export default notFound;
