import {Router} from "express";
import {indexation} from "../../controllers/indexation";

const router: Router = Router();

router.post("/forward", indexation.fwd_index)
router.post("/backward", indexation.bwd_index)
router.get("/forward/:id", indexation.fwd_book)
router.get("/forward/", indexation.fwd_books)
export default router;