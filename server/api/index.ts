import express from 'express';

import userRoutes from './user';
import auth from './auth';

const router = express.Router();
router.use('/auth', auth);
router.use('/user', userRoutes);

export default router;
