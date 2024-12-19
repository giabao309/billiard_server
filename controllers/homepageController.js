import homepage from "../repositories/homepage.js";

const getHomePageByName = async (req, res) => {
  try {
    const { name } = req.body;
    const homepageList = await homepage.getHomePageByName(name);
    res.json(homepageList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getHomePageByName,
};
