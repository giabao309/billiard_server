class User {
  constructor(id, email, name, numberphone, password, role_id) {
    this.id = id;
    this.email = email;
    this.name = name;
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
}

export default User;
