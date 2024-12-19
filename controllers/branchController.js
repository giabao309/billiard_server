import branchRepository from "../repositories/branchRepository.js";

const getBranch = async (req, res) => {
  try {
    const branches = await branchRepository.getBranch();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBranchByID = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const branch = await branchRepository.getBranchByID(branch_id);
    res.json(branch);
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
    console.log("Request body:", req.body);
    const { id, name, address, district } = req.body;

    const branch_id = await branchRepository.createBranch({
      branch_name: id,
      branch_address: name,
      branch_district: address,
      branch_phone: district,
    });

    res.status(201).json({
      message: "Thêm chi nhánh thành công",
      branch_id,
    });
  } catch (error) {
    console.error("Lỗi khi thêm chi nhánh:", error.message);
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

const getBranch2 = async (req, res) => {
  try {
    const branch2 = await branchRepository.getBranch2();
    res.json(branch2);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBranchDetailsById = async (req, res) => {
  try {
    const { branch_id } = req.query;

    if (!branch_id) {
      return res.status(400).json({ message: "branch_id is required" });
    }

    const branch = await branchRepository.getBranchDetailsById(branch_id);

    if (branch.length === 0) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.status(200).json(branch[0]);
  } catch (error) {
    console.error("Error fetching branch details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getBranch,
  getAddress,
  getDistrict,
  getBranchByUser,
  getFloorByBranch,
  createBranch,
  getBranchByID,
  getBranch2,
  getBranchDetailsById,
};
