import db from "../databases/database.js";
import Floor from "../models/floor.js";

const getFloor = async () => {
  const [rows] = await db.query(
    "SELECT fl.floor_id, fl.floor_name, br.branch_name FROM floors fl JOIN branches br ON br.branch_id = fl.branch_id"
  );
  const floorList = rows.map((floor) => {
    const flr = new Floor(floor.floor_id, floor.floor_name, floor.branch_name);
    return flr;
  });
  return floorList;
};
export default { getFloor };
