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

const getTableAvailable = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const tables = await tableRepository.getTableAvailable(branch_id);
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableByBranchAndFloor = async (req, res) => {
  try {
    const { branch_id, floor_id } = req.body;
    const tables = await tableRepository.getTableByBranchAndFloor(
      branch_id,
      floor_id
    );
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableByBranchAndStatus = async (req, res) => {
  try {
    const { branch_id, status_id } = req.body;
    const tables = await tableRepository.getTableByBranchAndStatus(
      branch_id,
      status_id
    );
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableByID = async (req, res) => {
  try {
    const { table_id } = req.body;
    const tables = await tableRepository.getTableByID(table_id);
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

const updateOpenTable = async (req, res) => {
  const { table_id } = req.body;
  const result = await tableRepository.updateOpenTable(table_id);
  res.status(200).json({ message: "Success" });
};

const updateCloseTable = async (req, res) => {
  const { table_id } = req.body;
  const result = await tableRepository.updateCloseTable(table_id);
  res.status(200).json({ message: "Success" });
};

const updateTransferTable = async (req, res) => {
  const { table_id, invoices_id } = req.body;
  const result = await tableRepository.updateTransferTable(
    table_id,
    invoices_id
  );
  res.status(200).json({ message: "Success" });
};

export default {
  getTable,
  getTableByBranch,
  getTableByID,
  getTableStatus,
  updateOpenTable,
  updateCloseTable,
  getTableByBranchAndFloor,
  getTableByBranchAndStatus,
  getTableAvailable,
  updateTransferTable,
};
