import { Router } from 'express';
import UserController from './userController';

const router = Router();
const userCtrl = new UserController();

// @route   GET
// @desc    Get a user
// @access  Public
router.get('/:username', userCtrl.getUser);

// @route   POST
// @desc    Register
// @access  Public
router.post('/register', userCtrl.register);

// @route   POST
// @desc    Login
// @access  Public
router.post('/login', userCtrl.login);

// @route   PUT
// @desc    Edit a user
// @access  Public
router.put('/', userCtrl.editUser);

// @route   DELETE
// @desc    Delete a user
// @access  Public
router.delete('/', userCtrl.deleteUser);

module.exports = router;
