class Customer {
  constructor(id, email, name, phone, membership) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.membership = membership;
  }
  static fromDatabase(row) {
    return new Customer(
      row.user_id,
      row.email,
      row.user_name,
      row.numberphone,
      row.membership_name
    );
  }
}

export default Customer;
