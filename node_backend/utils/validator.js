const mongoose = require("mongoose");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Validate email format
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

// Strong password
const isStrongPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
  return regex.test(password);
};


const requiredFields = (obj, fields) => {
  const missing = fields.filter((f) => !obj[f]);
  return {
    valid: missing.length === 0,
    missing,
  };
};

// Validation for User
const validateUserRegistration = (data) => {
  const { valid, missing } = requiredFields(data, ["name", "email", "password"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };

  if (!isValidEmail(data.email)) return { success: false, message: "Invalid email format" };
  if (!isStrongPassword(data.password))
    return {
      success: false,
      message:
        "Password must contain 8+ chars, including uppercase, lowercase, number, and special character",
    };

  return { success: true };
};

const validateUserLogin = (data) => {
  const { valid, missing } = requiredFields(data, ["email", "password"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };
  if (!isValidEmail(data.email)) return { success: false, message: "Invalid email format" };
  return { success: true };
};

// Validation for Equipment
const validateEquipment = (data) => {
  const { valid, missing } = requiredFields(data, ["name", "category"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };

  const allowedCategories = ["PPE", "Machinery", "Tool"];
  if (!allowedCategories.includes(data.category))
    return { success: false, message: "Invalid category type" };

  return { success: true };
};

// Validation for Project
const validateProject = (data) => {
  const { valid, missing } = requiredFields(data, ["name", "user"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };

  if (!isValidObjectId(data.user)) return { success: false, message: "Invalid user ID" };
  if (data.riskLevel && !["low", "medium", "high"].includes(data.riskLevel))
    return { success: false, message: "Invalid risk level" };

  return { success: true };
};

// Validation for Incident
const validateIncident = (data) => {
  const { valid, missing } = requiredFields(data, ["title", "description", "project", "reportedBy"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };

  if (!isValidObjectId(data.project)) return { success: false, message: "Invalid project ID" };
  if (!isValidObjectId(data.reportedBy)) return { success: false, message: "Invalid reporter ID" };

  const allowedSeverities = ["minor", "major", "critical"];
  if (data.severity && !allowedSeverities.includes(data.severity))
    return { success: false, message: "Invalid severity value" };

  return { success: true };
};

// Validation for Hazard
const validateHazard = (data) => {
  const { valid, missing } = requiredFields(data, ["title", "severity", "riskLevel"]);
  if (!valid) return { success: false, message: `Missing fields: ${missing.join(", ")}` };

  const allowedSeverity = ["Low", "Medium", "High"];
  const allowedRisk = ["low", "medium", "high"];

  if (!allowedSeverity.includes(data.severity))
    return { success: false, message: "Invalid severity value" };

  if (!allowedRisk.includes(data.riskLevel))
    return { success: false, message: "Invalid risk level" };

  return { success: true };
};

// Export all validators
module.exports = {
  isValidObjectId,
  isValidEmail,
  isStrongPassword,
  validateUserRegistration,
  validateUserLogin,
  validateEquipment,
  validateProject,
  validateIncident,
  validateHazard,
};
