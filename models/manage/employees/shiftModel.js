class Shift {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  static fromDatabase(row) {
    return new Shift(row.shift_id, row.shift_name, row.shift_description);
  }
}

export default Shift;
