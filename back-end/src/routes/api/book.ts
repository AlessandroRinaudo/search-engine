import {Router} from "express";
import {book} from "../../controllers/book";

const router: Router = Router();

router.get("/", book.find)
router.get("/:id", book.get)
router.post("/insert", book.insert)


export default router;