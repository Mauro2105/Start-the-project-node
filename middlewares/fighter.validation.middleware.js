import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  //Implement validatior for FIGHTER entity during creation
  const { name, power, defense, health, ...rest } = req.body;

  if (!name || typeof power === "undefined" || typeof defense === "undefined") {
    res.status(400).json({ error: true, message: "All fields except id and health are required" });
    return;
  }

  if (typeof power !== "number" || power < 1 || power > 100) {
    res.status(400).json({ error: true, message: "Power must be a number between 1 and 100" });
    return;
  }

  if (typeof defense !== "number" || defense < 1 || defense > 10) {
    res.status(400).json({ error: true, message: "Defense must be a number between 1 and 10" });
    return;
  }

  if (health && (typeof health !== "number" || health < 80 || health > 120)) {
    res.status(400).json({ error: true, message: "Health must be a number between 80 and 120" });
    return;
  }

  const allowedFields = Object.keys(FIGHTER).filter(key => key !== 'id');
  const extraFields = Object.keys(rest).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
    return;
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  //Implement validatior for FIGHTER entity during update
  const allowedFields = Object.keys(FIGHTER).filter(key => key !== 'id');
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

export { createFighterValid, updateFighterValid };
