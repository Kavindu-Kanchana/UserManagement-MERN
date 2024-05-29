import Admin from '../model/adminmodel.js';
import asyncHandler  from 'express-async-handler';
import generateToken from '../util/generateToken.js';

export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error('admin already exists');
  }
  const admin = await Admin.create({
    name,
    email,
    password,
  });
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('new error');
  }
});

export const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    throw new Error('Invalid login');
  }
});

//module.exports = { registerAdmin, authAdmin };
