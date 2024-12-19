class Type {
  constructor(id, name, provider) {
    this.id = id;
    this.name = name;
    this.provider = provider;
  }
  static fromDatabase(row) {
    return new Type(row.table_type_id, row.table_type_name, row.provider);
  }
}

export default Type;
