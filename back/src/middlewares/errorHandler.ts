import { Request, Response } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: any) {
    const error = new Error(`${err.message} - ${req.originalUrl}`);

    return res.send({
        message: error.message,
    });
}

export default errorHandler;
