class Table {
  constructor(id, name, price, type, status_id, status, floor_id) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.status_id = status_id;
    this.status = status;
    this.floor_id = floor_id;
  }
  static fromDatabase(row) {
    return new Table(
      row.table_id,
      row.table_name,
      row.table_price,
      row.table_type_name,
      row.table_status_id,
      row.table_status_name,
      row.floor_id
    );
  }
}

export default Table;
