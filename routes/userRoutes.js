import express from 'express';
import { registerUser, loginUser, getUsers, getUser, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
