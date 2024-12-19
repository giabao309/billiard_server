import db from "../databases/database.js";
import HomePage from "../models/homepage.js";

const getHomePageByName = async (name) => {
  const [rows] = await db.query(
    "SELECT * FROM edit_homepage e WHERE e.homepage_name = ?",
    [name]
  );
  const homepage = rows.map((row) => HomePage.fromDatabase(row));
  return homepage;
};

export default {
  getHomePageByName,
};
