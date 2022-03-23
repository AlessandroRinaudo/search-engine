import {Router} from "express";
import {book} from "../../controllers/book";

const router: Router = Router();

router.post("/insert", book.insert)

export default router;