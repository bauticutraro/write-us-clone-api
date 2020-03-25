import { Router } from 'express';
import Article from './article/articleRoute';
import User from './user/userRoute';

const router = Router();

router.use('/article', Article);
router.use('/user', User);

module.exports = router;
