const { HealthForm } = require("../models/healthform");
const express = require("express");
const router = express.Router();

// Lấy danh sách các form
router.get(`/`, async (req, res) => {
  try {
    const forms = await HealthForm.find(req.query);

    if (!forms) {
      return res.status(500).json({ success: false, message: "Không tìm thấy dữ liệu!" });
    }

    return res.status(200).json(forms);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Tạo mới một form
router.post("/add", async (req, res) => {
  try {
    const newForm = new HealthForm({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      weight: req.body.weight,
      height: req.body.height,
      goal: req.body.goal,
      diet: req.body.diet,
      healthConditions: req.body.healthConditions || [],
      allergies: req.body.allergies || [],
      activityLevel: req.body.activityLevel,
      additionalInfo: req.body.additionalInfo || "",
    });

    const savedForm = await newForm.save();

    return res.status(201).json(savedForm);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Xóa form theo ID
router.delete("/:id", async (req, res) => {
  try {
    const form = await HealthForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Không tìm thấy form với ID đã cho!" });
    }

    await HealthForm.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Form đã được xóa thành công!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Lấy thông tin form theo ID
router.get("/:id", async (req, res) => {
  try {
    const form = await HealthForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Không tìm thấy form với ID đã cho!" });
    }

    return res.status(200).json(form);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
