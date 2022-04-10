import {Router} from "express";
import {admin_controller} from "../../controllers/admin";

const router: Router = Router();

router.get("/dropdb", admin_controller.drop_db)

export default router;