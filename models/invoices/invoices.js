class InvoicesUnpaid {
  constructor(id, createDate, type, table_price, total, status) {
    this.id = id;
    this.createDate = createDate;
    this.type = type;
    this.table_price = table_price;
    this.total = total;
    this.status = status;
  }
  static fromDatabase(row) {
    return new InvoicesUnpaid(
      row.invoices_id,
      row.create_date,
      row.table_type_name,
      row.table_price,
      row.total_cost,
      row.invoices_status_id
    );
  }
}

export default InvoicesUnpaid;
