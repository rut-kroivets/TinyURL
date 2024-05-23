import Link from '../models/Link.js';
import User from '../models/User.js';

export const createLink = async (req, res) => {
  const { userId, originalUrl } = req.body;

  try {
    const link = new Link({ originalUrl });
    await link.save();

    const user = await User.findById(userId);
    user.links.push(link._id);
    await user.save();

    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    await link.remove();
    res.status(200).json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
