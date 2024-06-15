import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = async (req, res, next) => {
  // Implement validatior for USER entity during creation
  const { firstName, lastName, email, phoneNumber, password, ...rest } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400).json({ error: true, message: "All fields except id are required"});
    return;
  }

  if (!email.endsWith('@gmail.com')) {
    res.status(400).json({ error: true, message: "Email must be a @gmail.com address" });
    return;
  }

  const phonePattern = /^\+380\d{9}$/;
  if (!phonePattern.test(phoneNumber)){
    res.status(400).json({ error: true, message: "Phone number must be in the format +380xxxxxxxxx" });
    return;
  }

  if (password.length < 3) {
    res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
    return;
  }

  const existingUserByEmail = await userService.search({ email });
  if (existingUserByEmail) {
    res.status(400).json({ error: true, message: "Email already exists" });
    return;
  }

  const existingUserByPhone = await userService.search({ phoneNumber });
  if (existingUserByPhone) {
    res.status(400).json({ error: true, message: "Phone number already exists" });
    return;
  }

  const allowedFields = Object.keys(USER).filter(key => key !== 'id');
  const extraFields = Object.keys(rest).filter(key => !allowedFields.includes(key)); 
  if (extraFields.length > 0) {
    res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
    return;
  }

  next();
};

const updateUserValid = (req, res, next) => {
  //Implement validatior for user entity during update
  const allowedFields = Object.keys(USER).filter(key => key !== 'id');
  const updateFields = Object.keys(req.body);

  if (updateFields.length === 0 || !updateFields.some(field => allowedFields.includes(field))) {
    res.status(400).json({ error: true, message: "At least one valid field must be present to update" });
    return;
  }

  const extraFields = updateFields.filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
    return;
  }

  next();
};

export { createUserValid, updateUserValid };
