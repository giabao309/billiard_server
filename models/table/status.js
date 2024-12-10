class Status {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static fromDatabase(row) {
    return new Status(row.table_status_id, row.table_status_name);
  }
}

export default Status;
