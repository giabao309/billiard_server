class Branch {
  constructor(id, name, address, district, phone) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.district = district;
    this.phone = phone;
  }
  static fromDatabase(row) {
    return new Branch(
      row.branch_id,
      row.branch_name,
      row.branch_address,
      row.branch_district,
      row.branch_phone
    );
  }
}

export default Branch;
