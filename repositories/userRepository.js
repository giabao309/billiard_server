import db from "../databases/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/user/employee.js";
import User from "../models/user/user.js";
import Customer from "../models/user/customer.js";

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Tìm người dùng theo email
const findUserByEmail = async (email) => {
  try {
    const query = `
          SELECT u.*, r.role_name 
          FROM users u
          JOIN roles r ON u.role_id = r.role_id
          WHERE u.email = ?
      `;
    const [rows] = await db.execute(query, [email]);

    return rows.length > 0 ? User.fromDatabase(rows[0]) : null;
  } catch (error) {
    throw new Error("Lỗi truy vấn cơ sở dữ liệu: " + error.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const findUser = await findUserByEmail(email);
    if (!findUser) {
      throw new Error("Email không tồn tại.");
    }

    const user = findUser;

    // So sánh mật khẩu bất đồng bộ
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Mật khẩu không đúng.");
    }

    // Tạo JWT token và trả về
    const token = generateToken({
      userId: user.id,
      userName: user.name,
      roleId: user.role_id,
    });

    return {
      userId: user.id,
      userName: user.name,
      roleId: user.role_id,
      token: token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Tạo người dùng mới
const registerUser = async ({ email, user_name, numberphone, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email đã tồn tại.");
    }

    if (!email || !user_name || !numberphone || !password) {
      throw new Error("Vui lòng nhập đầy đủ thông tin.");
    }

    const query = `
          INSERT INTO users (email, user_name, numberphone, password, role_id)
          VALUES (?, ?, ?, ?, 3)
      `;

    const [result] = await db.execute(query, [
      email,
      user_name,
      numberphone,
      hashedPassword,
    ]);

    return result.insertId;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByID = async (user_id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [
    user_id,
  ]);
  const users = User.fromDatabase(rows[0]);
  return users;
};

const getEmployee = async () => {
  const [rows] = await db.query(
    "SELECT u.user_id, e.employee_id, u.email, u.user_name, u.numberphone, br.branch_name,br.branch_id, s.shift_name, e.salary FROM users u JOIN user_employee ue ON ue.user_id = u.user_id JOIN employees e on e.employee_id = ue.employee_id JOIN shifts s ON s.shift_id = e.shift_id JOIN branches br ON br.branch_id = e.branch_id"
  );
  const employeeList = rows.map((row) => Employee.fromDatabase(row));
  return employeeList;
};

const getEmployeeByUserID = async (user_id) => {
  const [rows] = await db.query(
    "SELECT u.user_id, e.employee_id, u.email, u.user_name, u.numberphone, br.branch_name,br.branch_id, s.shift_name, e.salary FROM users u JOIN user_employee ue ON ue.user_id = u.user_id JOIN employees e on e.employee_id = ue.employee_id JOIN shifts s ON s.shift_id = e.shift_id JOIN branches br ON br.branch_id = e.branch_id WHERE u.user_id = ?",
    [user_id]
  );
  const employee = Employee.fromDatabase(rows[0]);
  return employee;
};

const searchCustomer = async (query) => {
  const [rows] = await db.query(
    "SELECT * FROM users u WHERE (u.email LIKE ? OR u.numberphone LIKE ?) AND u.role_id = 3",
    [`%${query}%`, `%${query}%`]
  );
  const customer = rows.map((row) => Customer.fromDatabase(row));
  return customer;
};

export default {
  getEmployee,
  findUserByEmail,
  registerUser,
  login,
  getEmployeeByUserID,
  getUserByID,
  searchCustomer,
};
