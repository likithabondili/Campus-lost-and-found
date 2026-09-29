
const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");
const User = require("../models/User");

const router = express.Router();

// ==================== REPORT ITEM ====================

router.post("/", async (req, res) => {
  try {
    const {
      type,
      itemName,
      description,
      location,
      date,
      reportedBy,
    } = req.body;

    if (
      !type ||
      !itemName ||
      !description ||
      !location ||
      !date ||
      !reportedBy
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newItem = new Item({
      type,
      itemName,
      description,
      location,
      date,
      reportedBy,
    });

    await newItem.save();

    res.status(201).json({
      message: "Item reported successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==================== GET ALL ITEMS ====================

router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("reportedBy", "name email")
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==================== SEARCH & FILTER ITEMS ====================

router.get("/search/filter", async (req, res) => {
  try {
    const { type, itemName, location, status } = req.query;
    const filter = {};

    if (type) filter.type = type;

    if (itemName) {
      filter.itemName = {
        $regex: itemName,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (status) filter.status = status;

    const items = await Item.find(filter)
      .populate("reportedBy", "name email")
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==================== DELETE ITEM (ADMIN) ====================

router.delete("/:id", async (req, res) => {
  try {
    const adminId = req.headers["x-user-id"];

    if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(401).json({
        message: "Admin login required",
      });
    }

    const admin = await User.findById(adminId);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        message: "Only admins can delete items",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item ID",
      });
    }

    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==================== GET SINGLE ITEM ====================

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("reportedBy", "name email")
      .populate("claimedBy", "name email");

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// ==================== CLAIM ITEM ====================

router.put("/:id/claim", async (req, res) => {
  try {
    const { claimedBy } = req.body;

    if (!claimedBy) {
      return res.status(400).json({
        message: "claimedBy is required",
      });
    }

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.status === "claimed") {
      return res.status(400).json({
        message: "Item is already claimed",
      });
    }

    item.status = "claimed";
    item.claimedBy = claimedBy;

    await item.save();

    res.status(200).json({
      message: "Item claimed successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;