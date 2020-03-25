import { Router } from 'express';
import ArticleController from './articleController';

const router = Router();
const articleCtrl = new ArticleController();

router.get('/', articleCtrl.getArticles);

module.exports = router;
