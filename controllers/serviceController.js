import serviceRepository from "../repositories/serviceRepository.js";

const getService = async (req, res) => {
  try {
    const services = await serviceRepository.getService();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getServiceByType = async (req, res) => {
  try {
    const { type_id } = req.body;
    const services = await serviceRepository.getServiceByType(type_id);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getServiceByCate = async (req, res) => {
  try {
    const { category_id } = req.body;
    const services = await serviceRepository.getServiceByCate(category_id);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getServiceType = async (req, res) => {
  try {
    const types = await serviceRepository.getServiceType();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getServiceCategory = async (req, res) => {
  try {
    const categories = await serviceRepository.getServiceCategory();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const searchService = async (req, res) => {
  try {
    const { query } = req.body;
    const service = await serviceRepository.searchService(query);
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getService,
  getServiceType,
  getServiceCategory,
  getServiceByType,
  getServiceByCate,
  searchService,
};
