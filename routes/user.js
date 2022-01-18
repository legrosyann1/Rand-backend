import express from 'express';
import { getUser, createUser, getVaults, addVault, removeVault, getBalance, addBalance } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.get('/balance', getBalance)
router.post('/balance', addBalance);
router.get('/vaults', getVaults);
router.post('/vaults', addVault);
router.delete('/vaults/:id', removeVault);

export default router