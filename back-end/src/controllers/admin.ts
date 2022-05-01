import mongoose from "mongoose";
import {Request, Response} from "express";
import {handleErrors, handleSuccess} from "../utils/requests";

const drop_db = async (req: Request, res: Response) => {
    mongoose.connection.db.dropDatabase().then(msg => {
        handleSuccess(req, res, "Mongo database dropped successfully")
    }).catch(err =>
        handleErrors(req, res, "Could not drop db " + err)
    )
}

export const admin_controller = {
    drop_db
}