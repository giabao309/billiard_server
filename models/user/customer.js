class Customer {
  constructor(id, email, name, numberphone) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.numberphone = numberphone;
  }

  static fromDatabase(row) {
    return new Customer(row.user_id, row.email, row.user_name, row.numberphone);
  }
}

export default Customer;
