import storageRepository from "../repositories/storageRepository.js";

const getWarehouseByBranchId = async (req, res) => {
  try {
    const { branch_id } = req.query;
    if (!branch_id) {
      return res.status(400).json({ message: "branch_id is required" });
    }

    const warehouseData = await storageRepository.getWarehouseByBranchId(
      branch_id
    );

    if (warehouseData.length === 0) {
      return res
        .status(404)
        .json({ message: "No warehouse data found for this branch" });
    }

    res.status(200).json(warehouseData);
  } catch (error) {
    console.error("Error fetching warehouse data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteWarehouseItem = async (req, res) => {
  try {
    const { item_id } = req.params;

    if (!item_id) {
      return res.status(400).json({ message: "item_id is required" });
    }

    const result = await storageRepository.deleteItemById(item_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateWarehouseItem = async (req, res) => {
  const { item_id } = req.params;
  const { service_name, service_category_name, entry_quantity, entry_price } =
    req.body;

  if (!item_id) {
    return res.status(400).json({ message: "item_id is required" });
  }

  try {
    const result = await storageRepository.updateWarehouseItemById(item_id, {
      service_name,
      service_category_name,
      entry_quantity,
      entry_price,
    });

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const searchWarehouseByServiceName = async (req, res) => {
  try {
    const { branch_id, service_name } = req.query;

    if (!branch_id || !service_name) {
      return res
        .status(400)
        .json({ message: "branch_id and service_name are required" });
    }

    const warehouseData = await storageRepository.searchWarehouseByServiceName(
      branch_id,
      service_name
    );

    if (warehouseData.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(warehouseData);
  } catch (error) {
    console.error("Error searching warehouse data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getWarehouseByBranchId,
  deleteWarehouseItem,
  updateWarehouseItem,
  searchWarehouseByServiceName,
};
