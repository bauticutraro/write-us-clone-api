import UserModel from './userModel';
import ArticleModel from '../article/articleModel';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
  async getUser(req, res) {
    const { username } = req.params;

    if (!username) return res.status(200).json({ error: 'User Id required!' });

    try {
      const user = await UserModel.findOne({
        username: username.toLowerCase()
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async register(req, res) {
    const { username, password, email } = req.body;

    if (!username) return res.status(400).json({ error: 'Username required!' });
    if (!password) return res.status(400).json({ error: 'Password required!' });

    try {
      const newUser = new UserModel({
        username: username.toLowerCase(),
        password,
        email
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);

      newUser.password = hash;
      const user = await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.SECRET_OR_KEY);

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { password } = req.body;
      let username = req.body.username.toLowerCase();

      // Find user by email
      const user = await UserModel.findOne({ username });

      // Check for user
      if (!user) return res.status(404).json({ error: 'Invalid crendentials' });

      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_OR_KEY);
        return res.json({ success: true, token, user });
      } else return res.status(400).json({ error: 'Invalid crendentials' });
    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }

  async editUser(req, res) {
    const { userId, password } = req.body;

    const username = req.body.username.toLowerCase();

    try {
      if (!userId) return res.status(400).json({ error: 'User Id required!' });

      const user = await UserModel.findOne({ _id: userId });

      if (!user) return res.status(404).json({ error: 'User not found!' });

      if (username && user.username !== username) {
        const existUser = await UserModel.findOne({
          username
        });
        if (existUser)
          return res.status(400).json({ error: 'Username already taken' });
        else user.username = username;
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
      }

      await user.save();

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.body;
    try {
      await UserModel.deleteOne({ _id: userId });
      await ArticleModel.deleteMany({ user: userId });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
}

export default UserController;
