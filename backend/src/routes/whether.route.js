import { Router } from 'express';
import { getAQi, getWhether } from '../controllers/whether.controller.js';

const router = Router();

router.route('/currentWhether').get(getWhether)

router.route('/currentAQI').get(getAQi)

export default router;