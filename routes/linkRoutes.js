import express from 'express';
import { createLink, getLinks, getLink, deleteLink, updateLink,getLinkClicks } from '../controllers/linkController.js';

const router = express.Router();

router.post('/', createLink);
router.get('/', getLinks);
router.get('/:id', getLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);
router.get('/:id/clicks', getLinkClicks);
// router.get('/redirect/:id', async (req, res) => {
//     try {
//       const link = await Link.findById(req.params.id);
//       if (!link) {
//         return res.status(404).json({ message: 'Link not found' });
//       }
//       res.redirect(link.originalUrl);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

export default router;
