import { Router } from 'express';
const router = Router();

import express from 'express';
import { authAdmin, registerAdmin } from '../controllers/adminController.js';
import { getAllUsers, deleteUser, updateUserAd, getUserAd, getOneUserBySearch } from '../controllers/appController.js';

// const router = express.Router();

router.route('/').get(getAllUsers).post(getOneUserBySearch);
router.route('/delete/:id').delete(deleteUser);
router.route('/edit/:id').patch(updateUserAd);
router.route('/adminlogin').post(authAdmin);
router.route('/adminregister').post(registerAdmin);
router.route('/edit/:id').get(getUserAd);

export default router;
