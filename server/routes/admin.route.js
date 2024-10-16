import express from 'express';
import {getAllUsers, login,deleteUser,UnBlockUser,BlockUser } from '../controller/admin.controller.js';

const router = express.Router();

router.post('/login',login);
router.get('/userdetails',getAllUsers);
router.delete('/deleteuser/:id',deleteUser);
router.patch('/blockuser/:id',BlockUser);
router.patch('/unblockuser/:id',UnBlockUser);

export default router;