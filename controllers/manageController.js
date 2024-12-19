import manageRepository from "../repositories/manageRepository.js";

const getTableByBrachManage = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const tables = await manageRepository.getTableByBrachManage(branch_id);
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFloorByBrachManage = async (req, res) => {
  try {
    const { branch_id } = req.body;
    const floors = await manageRepository.getFloorByBrachManage(branch_id);
    res.json(floors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getTableType = async (req, res) => {
  try {
    const types = await manageRepository.getTableType();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getShift = async (req, res) => {
  try {
    const shifts = await manageRepository.getShift();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customers = await manageRepository.getCustomer();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getViewInvoice = async (req, res) => {
  try {
    const { user_id } = req.body;
    const invoices = await manageRepository.getViewInvoice(user_id);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomerByID = async (req, res) => {
  try {
    const { user_id } = req.body;
    const customers = await manageRepository.getCustomerByID(user_id);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const searchCustomerManage = async (req, res) => {
  try {
    const { query } = req.body;
    const customer = await manageRepository.searchCustomerManage(query);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTableManage = async (req, res) => {
  try {
    const { name, floor_id, type_id, status_id, price, table_id } = req.body;
    const respone = await manageRepository.updateTableManage({
      name,
      floor_id,
      type_id,
      status_id,
      price,
      table_id,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateEmployeeByEmployeeID = async (req, res) => {
  try {
    const { branch_id, shift_id, salary, employee_id } = req.body;

    const respone = await manageRepository.updateEmployeeByEmployeeID({
      branch_id,
      shift_id,
      salary,
      employee_id,
    });
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { branch_id, shift_id, salary, user_id } = req.body;

    const respone = await manageRepository.addEmployee({
      branch_id,
      shift_id,
      salary,
      user_id,
    });
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { user_id, employee_id } = req.body;

    const respone = await manageRepository.deleteEmployee({
      user_id,
      employee_id,
    });
    res.status(200).json(respone);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getTableByBrachManage,
  getFloorByBrachManage,
  getTableType,
  updateTableManage,
  getShift,
  updateEmployeeByEmployeeID,
  addEmployee,
  deleteEmployee,
  getCustomer,
  searchCustomerManage,
  getCustomerByID,
  getViewInvoice,
};
