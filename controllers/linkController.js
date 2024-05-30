import Link from '../models/Link.js';
import User from '../models/User.js';

export const createLink = async (req, res) => {
  console.log(req.body);
  const { userId, originalUrl, targetParamName, targetValues } = req.body;

  try {
    const newLink = {
      originalUrl,
      targetParamName: targetParamName || "t",
      targetValues: targetValues || []
    };
    const link = new Link(newLink);
    await link.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.links.push(link._id);
    await user.save();

    const shortUrl = `http://localhost:3000/links/${link._id}`;
    res.status(201).json({ shortUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    const targetParamValue = req.query[link.targetParamName];
    link.clicks.push({
      insertedAt: Date.now(),
      ipAddress: req.ip,
      targetParamValue: targetParamValue
    });
    await link.save();

    res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    await link.remove();
    res.status(200).json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLinkClicks = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    const clicks = link.clicks;
    console.log("Clicks found:", clicks);

    const clicksByPlatform = {};

    link.targetValues.forEach((platform) => {
      clicksByPlatform[platform.name] = clicks.filter((click) => click.targetParamValue === platform.value).length;
    });

    res.status(200).json(clicksByPlatform);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
