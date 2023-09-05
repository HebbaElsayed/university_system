const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true, },
    password: { type: String, required: true },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", FacultySchema );












