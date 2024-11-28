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

export default { getBranch, getAddress, getDistrict, getBranchByUser };
