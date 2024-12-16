class InvoicesDetail {
  constructor(invoice_detail_id, service_id, name, price, quantity) {
    this.invoice_detail_id = invoice_detail_id;
    this.service_id = service_id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  static fromDatabase(row) {
    return new InvoicesDetail(
      row.invoice_detail_id,
      row.service_id,
      row.service_name,
      row.service_price,
      row.service_quantity
    );
  }
}

export default InvoicesDetail;
