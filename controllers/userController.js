import userRepository from "../repositories/userRepository.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp email và mật khẩu." });
    }

    // Gọi phương thức login từ repository
    const result = await userRepository.login({ email, password });

    // Trả về thông tin người dùng và token
    res.status(200).json({
      message: "Đăng nhập thành công",
      token: result.token, // Lấy token từ kết quả trả về
      user: {
        userId: result.userId,
        userName: result.userName,
        roleId: result.roleId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, user_name, numberphone, password } = req.body;

    const userId = await userRepository.registerUser({
      email,
      user_name,
      numberphone,
      password,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi: " + error.message });
  }
};

const getUserByID = async (req, res) => {
  try {
    const { user_id } = req.body;

    const users = await userRepository.getUserByID(user_id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employees = await userRepository.getEmployee();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployeeByID = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const employees = await userRepository.getEmployeeByID(employee_id);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getEmployee,
  registerUser,
  login,
  getEmployeeByID,
  getUserByID,
};
