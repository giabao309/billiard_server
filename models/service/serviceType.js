class ServiceType {
  constructor(id, name, cate) {
    this.id = id;
    this.name = name;
    this.cate = cate;
  }
  static fromDatabase(row) {
    return new ServiceType(
      row.service_type_id,
      row.service_type_name,
      row.service_category_id
    );
  }
}

export default ServiceType;
