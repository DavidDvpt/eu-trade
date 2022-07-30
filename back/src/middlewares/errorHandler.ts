import { Request, Response } from 'express';

function errorHandler(req: Request, res: Response, next: any) {
    switch (res.statusCode) {
        case 404: {
            res.statusMessage = 'Not found';
            break;
        }
        default: {
            res.statusCode = 500;
            res.statusMessage = 'Server error';
        }
    }

    const error = new Error(`🔍 - ${res.statusMessage} - ${req.originalUrl}`);

    return res.send({
        message: error,
    });
}

export default errorHandler;
