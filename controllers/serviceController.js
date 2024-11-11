import serviceRepository from "../repositories/serviceRepository.js";

const getService = async (req, res) => {
  try {
    const services = await serviceRepository.getService();
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
export default { getService, getServiceType, getServiceCategory };
