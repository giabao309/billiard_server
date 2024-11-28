class User {
  constructor(user_id, email, user_name, numberphone, password, role_id) {
    this.user_id = user_id;
    this.email = email;
    this.user_name = user_name;
    this.numberphone = numberphone;
    this.password = password;
    this.role_id = role_id;
  }

  static fromDatabase(row) {
    return new User(
      row.user_id,
      row.email,
      row.user_name,
      row.numberphone,
      row.password,
      row.role_id
    );
  }

  toJSON() {
    return {
      id: this.user_id,
      email: this.email,
      name: this.user_name,
      numberphone: this.numberphone,
      role: this.role_id, // Bao gồm role trong phản hồi
    };
  }
}

export default User;
