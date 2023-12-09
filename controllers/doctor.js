const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

//to register the doctor
module.exports.createDoctor = async (req, res) => {
  try {
    //check if password and confirm password matches
    const { password, confirm_password } = req.body;
    if (password != confirm_password) {
      return res.status(200).json({
        message: "Passwords do not match",
      });
    }
    //find the doctor using the phone first before signing up - if email already exists
    let doctor = await Doctor.findOne({ phone: req.body.phone });

    //if doctor doesn't exist - create the doctor
    if (!doctor) {
      await Doctor.create(req.body);
      return res.status(200).json({
        message: "Doctor registered successfully",
      });
    } else {
      //if user/email exists - redirect back
      return res.status(422).json({
        message: "Doctor already exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//logging in a doctor
module.exports.createSession = async (req, res) => {
  try {
    //find the doctor if he/she exists using phone no
    let doctor = await Doctor.findOne({ phone: req.body.phone });
    if (!doctor) {
      return res.status(422).json({
        message: "Invalid Username",
      });
    }
    //if do not exists or exists and password do not match
    let isValid = await doctor.isValidPassword(req.body.password);
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid Password",
      });
    }

    //if doctor exists and passwords match - login and generate jwt token
    return res.status(200).json({
      message: "Sign in successfull",
      doctorID: doctor._id,
      Name: doctor.name,
      data: {
        token: jwt.sign(doctor.toJSON(), 'luck', {
          expiresIn: "1h",
        }),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
