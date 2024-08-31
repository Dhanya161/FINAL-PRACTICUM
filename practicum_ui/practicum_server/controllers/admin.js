import bcrypt from "bcrypt";
import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    //receiving data from frontend
    const { 
      email, 
      password, 
    } = req.body;
    console.log('received data')
    //checking if the incoming data is already associated with a user in the database
    const existingAdmin = await Admin.findOne({email});
    if (existingAdmin) {
      return res.status(404).json(
        { message: 'Admin already has an account' }
      )
    }
    console.log('no existing record found')

    //encrypting the password 
    const hashedPassword = await bcrypt.hash(
      password, 
      10
    )
    console.log('hashed password')

    //creating the user in the database with the hashedPassword
    const newAdmin = new Admin({
      email, 
      password:hashedPassword, 
    });
    await newAdmin.save();
    console.log('user saved')

    //sending the user data to frontend without the password field
    const AdminData = {
      email,
      id: newAdmin._id,
    };

    //adding a token to keep the data live for some time (similar to cookie setting)
    const token = jwt.sign(
      { id: newAdmin._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );
    
    //sending the data to the frontend
    res.status(201).json({ 
      token, 
      user: AdminData 
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

}

export const login = async (req, res) => {
    try {
      //receiving credentials from frontend
      const { 
        email, 
        password 
      } = req.body;
      
      const admin = await Admin.findOne({ email: email });
  
      if (!admin) {
        return res.status(400).json({
          msg: "admin not found",
        });
      }
       
      const isMatch = await bcrypt.compare(
        password, 
        admin.password
      );
      
      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid credentials",
        });
      }
      
      const token = jwt.sign(
        {id: admin._id }, 
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}
      );

        res.status(200).json({
          token,
          message: 'Admin logged in successfully'
        });

    } catch (err) {
      res.status(500).json(
        { error: err.message }
      );
    }
  };