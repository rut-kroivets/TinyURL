import express from 'express';
import { createLink, getLinks, getLink, deleteLink, updateLink,getLinkClicks } from '../controllers/linkController.js';

const router = express.Router();

router.post('/', createLink);
router.get('/', getLinks);
router.get('/:id', getLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);
router.get('/:id/clicks', getLinkClicks);

export default router;
