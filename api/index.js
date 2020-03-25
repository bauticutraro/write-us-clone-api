import { Router } from 'express';
import Article from './article/articleRoute';

const router = Router();

router.use('/article', Article);

module.exports = router;
