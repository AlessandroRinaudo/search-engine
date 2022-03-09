import bcrypt from "bcryptjs";
import {Router, Response} from "express";
import HttpStatusCodes from "http-status-codes";
import Request from "../../types/Request";
import User, {IUser} from "../../models/User";

const router: Router = Router();

router.post(
    "/",
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try {
            let user: IUser = await User.findOne({email});
            if (user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "User already exists"
                        }
                    ]
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            user = new User({
                email,
                password: hashed
            });
            await user.save();

        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);

export default router;
