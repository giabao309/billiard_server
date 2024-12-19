import db from "../databases/database.js";
import Service from "../models/service/service.js";
import ServiceType from "../models/service/serviceType.js";
import ServiceCategory from "../models/service/serviceCategory.js";

const getService = async () => {
  const [rows] = await db.query(
    "SELECT sr.service_id, sr.service_name, sr.service_price, tp.service_type_name, cg.service_category_name, sr.img FROM services sr JOIN service_type tp ON tp.service_type_id = sr.service_type_id JOIN service_category cg ON cg.service_category_id = tp.service_category_id"
  );
  const services = rows.map((row) => Service.fromDatabase(row));
  return services;
};

const getServiceByType = async (type_id) => {
  const [rows] = await db.query(
    "SELECT sr.service_id, sr.service_name, sr.service_price, tp.service_type_name, cg.service_category_name, sr.img FROM services sr JOIN service_type tp ON tp.service_type_id = sr.service_type_id JOIN service_category cg ON cg.service_category_id = tp.service_category_id WHERE tp.service_type_id = ?",
    [type_id]
  );
  const services = rows.map((row) => Service.fromDatabase(row));
  return services;
};

const getServiceByCate = async (category_id) => {
  const [rows] = await db.query(
    "SELECT sr.service_id, sr.service_name, sr.service_price, tp.service_type_name, cg.service_category_name, sr.img FROM services sr JOIN service_type tp ON tp.service_type_id = sr.service_type_id JOIN service_category cg ON cg.service_category_id = tp.service_category_id WHERE cg.service_category_id = ?",
    [category_id]
  );
  const services = rows.map((row) => Service.fromDatabase(row));
  return services;
};

const getServiceType = async () => {
  const [rows] = await db.query("SELECT * FROM service_type");
  const type = rows.map((row) => ServiceType.fromDatabase(row));
  return type;
};

const getServiceCategory = async () => {
  const [rows] = await db.query("SELECT * FROM service_category");
  const category = rows.map((row) => ServiceCategory.fromDatabase(row));
  return category;
};

const searchService = async (query) => {
  const [rows] = await db.query(
    "SELECT sr.service_id, sr.service_name, sr.service_price, tp.service_type_name, cg.service_category_name, sr.img FROM services sr JOIN service_type tp ON tp.service_type_id = sr.service_type_id JOIN service_category cg ON cg.service_category_id = tp.service_category_id WHERE sr.service_name LIKE ?",
    [`%${query}%`]
  );
  const service = rows.map((row) => Service.fromDatabase(row));
  return service;
};

export default {
  getService,
  getServiceType,
  getServiceCategory,
  getServiceByType,
  getServiceByCate,
  searchService,
};
