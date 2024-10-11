import express from 'express';
const router = express.Router();
import {insertSportCenter, getSportCenters} from "../controllers/sportCenterController.js";

router.post('/', insertSportCenter);
router.get('/', getSportCenters);

export default router;