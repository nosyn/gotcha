import { Router } from 'express';

// Routes
import postVerify from './postVerify.js';

const router = Router();

/**
 * Verify JWT
 */
router.post('/verify', postVerify);

export default router;
