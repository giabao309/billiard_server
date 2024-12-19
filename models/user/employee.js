class Employee {
  constructor(
    user_id,
    employee_id,
    email,
    name,
    phone,
    branch,
    branch_id,
    shift,
    shift_id,
    salary
  ) {
    this.user_id = user_id;
    this.employee_id = employee_id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.branch = branch;
    this.branch_id = branch_id;
    this.shift = shift;
    this.shift_id = shift_id;
    this.salary = salary;
  }

  static fromDatabase(row) {
    return new Employee(
      row.user_id,
      row.employee_id,
      row.email,
      row.user_name,
      row.numberphone,
      row.branch_name,
      row.branch_id,
      row.shift_name,
      row.shift_id,
      row.salary
    );
  }
}

export default Employee;
