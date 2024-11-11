import floorRepository from "../repositories/floorRepository.js";

const getFloor = async (req, res) => {
  try {
    const floors = await floorRepository.getFloor();
    res.json(floors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export default { getFloor };
