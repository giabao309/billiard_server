class Service {
  constructor(id, name, price, type, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.type = type;
    this.img = img;
  }
  static fromDatabase(row) {
    return new Service(
      row.service_id,
      row.service_name,
      row.service_price,
      row.service_type_name,
      row.img
    );
  }
}

export default Service;
