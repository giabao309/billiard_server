import tableRepository from "../repositories/tableRepository.js";

const getTable = async (req, res) => {
  try {
    const tables = await tableRepository.getTable();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export default { getTable };
