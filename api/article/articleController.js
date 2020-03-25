import ArticleModel from './articleModel';

class ArticleController {
  async getArticles(req, res) {
    const articles = await ArticleModel.find({});
    return res.status(200).json(articles);
  }
}

export default ArticleController;
