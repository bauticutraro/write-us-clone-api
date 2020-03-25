import { Router } from 'express';
import ArticleController from './articleController';

const router = Router();
const articleCtrl = new ArticleController();

// @route   GET
// @desc    Get all articles
// @access  Public
router.get('/', articleCtrl.getArticles);

// @route   GET
// @desc    Get all articles
// @access  Public
router.get('/:id', articleCtrl.getUserArticles);

// @route   POST
// @desc    Create an article
// @access  Public
router.post('/', articleCtrl.createArticle);

// @route   PUT
// @desc    Edit an article
// @access  Public
router.put('/', articleCtrl.editArticle);

// @route   DELETE
// @desc    Delete an article
// @access  Public
router.delete('/', articleCtrl.deleteArticle);

module.exports = router;
