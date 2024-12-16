class Promotion {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
  static fromDatabase(row) {
    return new Promotion(
      row.promotion_id,
      row.promotion_name,
      row.promotion_value
    );
  }
}

export default Promotion;
