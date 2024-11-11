import branchRepository from "../repositories/branchRepository.js";

const getBranch = async (req, res) => {
  try {
    const branches = await branchRepository.getBranch();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export default { getBranch };
