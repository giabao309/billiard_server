class ServiceCategory {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  static fromDatabase(row) {
    return new ServiceCategory(
      row.service_category_id,
      row.service_category_name
    );
  }
}

export default ServiceCategory;
