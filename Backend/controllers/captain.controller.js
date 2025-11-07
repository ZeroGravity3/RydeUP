const CaptainModel = require("../models/captain.model");
const blackListTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExists = await CaptainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash password using model's static method
    const hashedPassword = await CaptainModel.hashPassword(password);

    // Create new captain
    // Normalize vehicle type and handle typos from client (e.g. 'moto')
    const rawVehicleType = (vehicle && (vehicle.vehicleType || vehicle.vehiclesType)) || "";
    const normalizedVehicleType = String(rawVehicleType).toLowerCase();
    // Map frontend value 'moto' to the model's 'motorcycle' to keep compatibility
    const vehicleTypeForModel = normalizedVehicleType === 'moto' ? 'motorcycle' : normalizedVehicleType;

    const captain = await CaptainModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicleTypeForModel,
      },
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Error in registerCaptain:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find captain with password field
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
  } catch (error) {
    console.error("Error in loginCaptain:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    res.status(200).json({ captain: req.captain });
  } catch (error) {
    console.error("Error in getCaptainProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    await blackListTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logoutCaptain:", error);
    res.status(500).json({ message: "Server error" });
  }
};
