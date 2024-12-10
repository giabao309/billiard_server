import db from "../databases/database.js";
import Branch from "../models/branch/branch.js";
import Address from "../models/branch/address.js";
import District from "../models/branch/district.js";
import Floor from "../models/branch/floor.js";
import BranchByEmployee from "../models/branch/branchByEmployee.js";

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

const getBranchByUser = async (userID) => {
  const [rows] = await db.query(
    "SELECT u.user_id, br.branch_name FROM users u JOIN user_employee ue ON ue.user_id = u.user_id JOIN employees e ON e.employee_id = ue.employee_id JOIN branches br ON br.branch_id = e.branch_id WHERE u.user_id = ?",
    [userID]
  );
  const branch = new BranchByEmployee(rows[0].user_id, rows[0].branch_name);

  return branch;
};

const getAddress = async () => {
  const [rows] = await db.query(
    "SELECT br.branch_address, br.branch_district FROM branches br"
  );
  const addressList = rows.map((address) => {
    const ad = new Address(address.branch_address, address.branch_district);
    return ad;
  });
  return addressList;
};

const getDistrict = async () => {
  const [rows] = await db.query(
    "SELECT DISTINCT branch_district FROM branches"
  );
  const districtList = rows.map((district) => {
    const dt = new District(district.branch_district);
    return dt;
  });
  return districtList;
};

const getFloorByBranch = async (branch_id) => {
  const [rows] = await db.query("SELECT * FROM floors WHERE branch_id = ?", [
    branch_id,
  ]);
  const floors = rows.map((row) => Floor.fromDatabase(row));
  return floors;
};

export default {
  getBranch,
  getAddress,
  getDistrict,
  getBranchByUser,
  getFloorByBranch,
};
