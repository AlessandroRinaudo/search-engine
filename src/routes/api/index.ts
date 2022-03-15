import {Response, Router} from "express";
import Request from "Request";
import HttpStatusCodes from "http-status-codes";
import {tokenize_dir} from "../../utils/tokenize";

const router: Router = Router();

router.get("/",
    async (req: Request, res: Response) => {
        console.log(req.params);
        try {
            const tokens = await tokenize_dir("data");
            res.status(HttpStatusCodes.OK).send(tokens);
        } catch (e) {
            res.status(HttpStatusCodes.BAD_REQUEST).send(e);
        }

    });

export default router;