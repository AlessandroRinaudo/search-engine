import {Request, Response} from "express";
import HttpStatusCodes from "http-status-codes";

export const handleErrors = (req: Request, res: Response, err: any) => {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: err,
        data: null
    })
}

export const handleSuccess = (req: Request, res: Response, data: any, status = HttpStatusCodes.OK) => {
    return res.status(status).json({
        success: true,
        data: data
    })
}