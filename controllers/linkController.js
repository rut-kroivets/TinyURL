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
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    const targetParamValue = req.query[link.targetParamName] || null;

    link.clicks.push({
      insertedAt: Date.now(),
      ipAddress: req.ip,
      targetParamValue
    });
    await link.save();

    res.redirect(link.originalUrl);
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

export const getLinkClicks = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Fetching clicks for link ID:", id);
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    console.log("Link found:", link);

    const clicks = link.clicks;
    console.log("Clicks found:", clicks);

    const clicksBySource = {};

    link.targetValues.forEach((source) => {
      clicksBySource[source.name] = clicks.filter((click) => click.targetParamValue === source.value).length;
    });

    console.log("Clicks by source:", clicksBySource);

    res.status(200).json(clicksBySource);
  } catch (err) {
    console.error("Error fetching clicks:", err);
    res.status(500).json({ message: err.message });
  }
};
