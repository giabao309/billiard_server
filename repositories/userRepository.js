import db from "../databases/database.js";
import Employee from "../models/user/employee.js";
import User from "../models/user/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      userId: user.user_id,
      userName: user.user_name,
      roleId: user.role_id,
    });

    return {
      userId: user.user_id,
      userName: user.user_name,
      roleId: user.role_id,
      token: token, // Trả về token cùng thông tin người dùng
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// const registerUser = async ({ email, user_name, numberphone, password }) => {
//   if (!email || !user_name || !numberphone || !password) {
//     throw new Error("Vui lòng nhập đầy đủ thông tin.");
//   }

//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       throw new Error("Email đã tồn tại.");
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User(
//       null,
//       email,
//       user_name,
//       numberphone,
//       hashedPassword,
//       3
//     );

//     const query = `
//       INSERT INTO users (email, user_name, numberphone, password, role_id)
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//       newUser.email,
//       newUser.user_name,
//       newUser.numberphone,
//       newUser.hashedPassword,
//       newUser.role_id,
//     ]);

//     newUser.user_id = result.insertId;

//     return newUser.toJSON();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

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

const getEmployee = async () => {
  const [rows] = await db.query(
    "SELECT e.employee_id, u.email, u.user_name, u.numberphone, br.branch_name, sf.shift_name, e.salary FROM users u JOIN user_employee ue ON ue.user_id = u.user_id JOIN employees e ON e.employee_id = ue.employee_id JOIN roles r ON r.role_id = u.role_id JOIN branches br ON br.branch_id = e.branch_id JOIN shifts sf ON sf.shift_id = e.shift_id"
  );
  const employeeList = rows.map((employee) => {
    const epl = new Employee(
      employee.employee_id,
      employee.email,
      employee.user_name,
      employee.numberphone,
      employee.branch_name,
      employee.shift_name,
      employee.salary
    );
    return epl;
  });
  return employeeList;
};

const getEmployeeByID = async (employeeID) => {
  const [rows] = await db.query(
    "SELECT e.employee_id, u.email, u.user_name, u.numberphone, br.branch_name, sf.shift_name, e.salary " +
      "FROM users u " +
      "JOIN user_employee ue ON ue.user_id = u.user_id " +
      "JOIN employees e ON e.employee_id = ue.employee_id " +
      "JOIN roles r ON r.role_id = u.role_id " +
      "JOIN branches br ON br.branch_id = e.branch_id " +
      "JOIN shifts sf ON sf.shift_id = e.shift_id " +
      "WHERE e.employee_id = ?",
    [employeeID]
  );

  const employee = new Employee(
    rows[0].employee_id,
    rows[0].email,
    rows[0].user_name,
    rows[0].numberphone,
    rows[0].branch_name,
    rows[0].shift_name,
    rows[0].salary
  );
  return employee;
};

export default {
  getEmployee,
  findUserByEmail,
  registerUser,
  login,
  getEmployeeByID,
};
