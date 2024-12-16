class InvoicesUnpaid {
  constructor(id, createDate, type, table_price, total) {
    this.id = id;
    this.createDate = createDate;
    this.type = type;
    this.table_price = table_price;
    this.total = total;
  }
  static fromDatabase(row) {
    return new InvoicesUnpaid(
      row.invoices_id,
      row.create_date,
      row.table_type_name,
      row.table_price,
      row.total_cost
    );
  }
}

export default InvoicesUnpaid;
