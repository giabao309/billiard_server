import db from "../databases/database.js";
import Service from "../models/service/service.js";
import ServiceType from "../models/service/serviceType.js";
import ServiceCategory from "../models/service/serviceCategory.js";

const getService = async () => {
  const [rows] = await db.query(
    "SELECT sv.service_id, sv.service_name, sv.service_price, t.service_type_name, sv.img FROM services sv JOIN service_type t ON t.service_type_id = sv.service_type_id"
  );
  const services = rows.map((row) => Service.fromDatabase(row));
  return services;
};

const getServiceType = async () => {
  const [rows] = await db.query("SELECT * FROM service_type");
  const typeList = rows.map((service) => {
    const type = new ServiceType(
      service.service_type_id,
      service.service_type_name
    );
    return type;
  });
  return typeList;
};

const getServiceCategory = async () => {
  const [rows] = await db.query(
    "SELECT DISTINCT service_type_category FROM service_type"
  );
  const categoryList = rows.map((category) => {
    const cate = new ServiceCategory(category.service_type_category);
    return cate;
  });
  return categoryList;
};

export default { getService, getServiceType, getServiceCategory };
