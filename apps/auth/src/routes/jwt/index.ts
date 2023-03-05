import { Router } from 'express';

// Routes
import postVerifyJwt from './postVerifyJwt.js';
import { handlerFuncWrapper } from '../utils/handlerFuncWrapper.js';

const router = Router();

/**
 * Verify JWT
 */
router.post('/verify', handlerFuncWrapper(postVerifyJwt));

export default router;
