class Table {
  constructor(
    id,
    name,
    floor_id,
    floor,
    type_id,
    type,
    status_id,
    status,
    price
  ) {
    this.id = id;
    this.name = name;
    this.floor_id = floor_id;
    this.floor = floor;
    this.type_id = type_id;
    this.type = type;
    this.status_id = status_id;
    this.status = status;
    this.price = price;
  }
  static fromDatabase(row) {
    return new Table(
      row.table_id,
      row.table_name,
      row.floor_id,
      row.floor_name,
      row.table_type_id,
      row.table_type_name,
      row.table_status_id,
      row.table_status_name,
      row.table_price
    );
  }
}

export default Table;
