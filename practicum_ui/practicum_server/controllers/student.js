import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
//receiving data from frontend 
      const { 
        name,
        programme,
        referenceNumber,
        email,
        password,
        indexNumber,
        year
      } = req.body;
      console.log(req.body);
//checking if the incoming data is already associated with a user in the database
      const existingStudent = await Student.findOne({email});
      console.log('passed stage')
      if (existingStudent) {
        return res.status(404).json(
          { message: 'Student already has an account' }
        )
      }
     
//encrypting the password 
      const hashedPassword = await bcrypt.hash(
        password, 
        10  
      ) 
    
      console.log('adding new student')
//creating the user in the database with the hashedPassword
      const newstudent = new Student({
        email,
        name,
        programme,
        indexNumber,
        referenceNumber,
        year,
        password:hashedPassword, 
      });
      await newstudent.save();

      const token = jwt.sign(
        {id: newstudent._id }, 
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}
      );

 //removing the password field from the data we are sending to the frontend
 const { 
  password: _, 
  ...studentData 
} = newstudent._doc;

console.log('success')
//sending the token and data of student as the response 
  res.status(201).json({
    token, 
    studentData,
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
      console.log(req.body)
//finding a student with the provided email in the database
      const student = await Student.findOne({ email: email });
  
//if the student doesn't exist, we send an error message
      if (!student) { 
        return res.status(404).json({
          msg: "Student not found",
        }); 
      }

      console.log('ismatch')
       
      
//checking if the provided password matches the hashed password in the database
      const isMatch = await bcrypt.compare(
        password, 
        student.password
      );
      
//if passwords don't match, we respond with an error
      if (!isMatch) {
        return res.status(400).json({ 
          msg: "Invalid credentials",
        }); 
      }
      console.log('token assigned')
//assigning a token to the user with an expiration time of 1 day
      const token = jwt.sign(
        {id: student._id }, 
        process.env.JWT_SECRET, 
        {expiresIn: '1d'}
      );
      
//removing the password field from the data we are sending to the frontend
      const { 
        password: _, 
        ...studentData 
      } = student._doc;
      
//sending the token and data of student as the response 
        res.status(201).json({
          token, 
          studentData,
        });

    } catch (err) {
      res.status(500).json(
        { error: err.message }
      );
    }
  };

  //Delete an account
export const deletion = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const existingStudent = await Student.findById(id)
    if (!existingStudent) {
      return res.status(400).json({
        msg: "student not found",
      });
    }

    await existingStudent.remove()
    res.status(201).json({
      message: 'account deleted successfully'
    })
  } catch (error) {
    res.status(500).json(
      { error: err.message }
    );
  }
}



export const getStudentData = async (req, res) => {
    try {
        const studentId = req.user.id; 
        
        const student = await Student.findById(studentId).select('-password');
        
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
