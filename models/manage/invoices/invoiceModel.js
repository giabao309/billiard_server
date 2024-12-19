class Invoices {
  constructor(id, branch, username, table, createDate, promotion, totalCost) {
    this.id = id;
    this.branch = branch;
    this.username = username;
    this.table = table;
    this.createDate = createDate;
    this.promotion = promotion;
    this.totalCost = totalCost;
  }
  static fromDatabase(row) {
    return new Invoices(
      row.invoices_id,
      row.branch_name,
      row.user_name,
      row.table_name,
      row.create_date,
      row.promotion_name,
      row.total_cost
    );
  }
}

export default Invoices;
