import Qualification from "../models/qualificationModel.js";

// GET all qualifications
export const getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.status(200).json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET qualification by id
export const getQualificationById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    res.status(200).json(qualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST - add new qualification
export const addQualification = async (req, res) => {
  try {
    const newQualification = new Qualification(req.body);
    await newQualification.save();
    res.status(201).json(newQualification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - update qualification
export const updateQualification = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE qualification by id
export const deleteQualification = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Qualification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE all qualifications
export const deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany();
    res.status(200).json({ message: "All qualifications deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
