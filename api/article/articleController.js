import ArticleModel from './articleModel';

class ArticleController {
  async getArticles(req, res) {
    const { articleId } = req.query;

    const query = {};

    if (articleId) query._id = articleId;

    try {
      const articles = await ArticleModel.find(query);
      if (articleId) return res.status(200).json(articles[0]);
      return res.status(200).json(articles);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async getUserArticles(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: 'User Id required!' });

    try {
      const articles = await ArticleModel.find({ user: id });
      return res.status(200).json(articles);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async createArticle(req, res) {
    const { content, user, status } = req.body;
    try {
      if (!content.trim())
        return res.status(400).json({ error: 'Content required!' });

      const article = await ArticleModel.create({
        content,
        user: user || null,
        status
      });
      return res.status(200).json(article);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async editArticle(req, res) {
    const { articleId, content, status } = req.body;
    try {
      if (!content.trim())
        return res.status(400).json({ error: 'Content required!' });

      const article = await ArticleModel.findOne({ _id: articleId });

      if (!article)
        return res.status(404).json({ error: 'Article not found!' });

      article.content = content || article.content;
      article.status = status || article.status;

      return res.status(200).json(article);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async deleteArticle(req, res) {
    const { articleId } = req.body;
    try {
      await ArticleModel.deleteOne({ _id: articleId });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
}

export default ArticleController;
