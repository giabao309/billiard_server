import db from "../databases/database.js";
import Branch from "../models/branch.js";

const getBranch = async () => {
  const [rows] = await db.query("SELECT * FROM branches");
  const branchList = rows.map((branch) => {
    const br = new Branch(
      branch.branch_id,
      branch.branch_name,
      branch.branch_address,
      branch.branch_district,
      branch.branch_phone
    );
    return br;
  });
  return branchList;
};
export default { getBranch };
