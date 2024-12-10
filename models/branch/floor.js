class Floor {
  constructor(id, name, branch) {
    this.id = id;
    this.name = name;
    this.branch = branch;
  }

  static fromDatabase(row) {
    return new Floor(row.floor_id, row.floor_name, row.branch_id);
  }
}

export default Floor;
