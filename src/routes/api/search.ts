import {Router} from "express";
import {search_controller} from "../../controllers/search";

const router: Router = Router();

router.get("/", search_controller.search)

export default router;