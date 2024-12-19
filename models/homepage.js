class HomePage {
  constructor(id, name, title, description, img) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.description = description;
    this.img = img;
  }
  static fromDatabase(row) {
    return new HomePage(
      row.homepage_id,
      row.homepage_name,
      row.homepage_title,
      row.homepage_description,
      row.img
    );
  }
}

export default HomePage;
