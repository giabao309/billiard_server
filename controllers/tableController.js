import tableRepository from "../repositories/tableRepository.js";

const getTable = async (req, res) => {
  try {
    const tables = await tableRepository.getTable();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableByBranch = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const tables = await tableRepository.getTableByBranch(branch_id);
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableStatus = async (req, res) => {
  try {
    const status = await tableRepository.getTableStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export default { getTable, getTableByBranch, getTableStatus };
