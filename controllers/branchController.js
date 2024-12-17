import branchRepository from "../repositories/branchRepository.js";

const getBranch = async (req, res) => {
  try {
    const branches = await branchRepository.getBranch();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBranchByUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const branch = await branchRepository.getBranchByUser(userID);
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAddress = async (req, res) => {
  try {
    const address = await branchRepository.getAddress();
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDistrict = async (req, res) => {
  try {
    const district = await branchRepository.getDistrict();
    res.json(district);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFloorByBranch = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const floor = await branchRepository.getFloorByBranch(branch_id);
    res.json(floor);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createBranch = async (req, res) => {
  try {
    const { branch_name, branch_address, branch_district, branch_phone } =
      req.body;

    const branch_id = await branchRepository.createBranch({
      branch_name,
      branch_address,
      branch_district,
      branch_phone,
    });

    res.status(201).json({
      message: "Thêm chi nhánh thành công",
      branch_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

export default {
  getBranch,
  getAddress,
  getDistrict,
  getBranchByUser,
  getFloorByBranch,
  createBranch,
};
