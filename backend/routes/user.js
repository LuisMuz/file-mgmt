import express from "express";
import prisma from "../db/prisma.js";
import multer from "multer";
import bcrypt from 'bcrypt'

const router = express.Router();

const upload = multer({
  dest: `uploads/`,

});

const roleMapping = {
  0: 'ADMIN',
  1: 'RESEARCHER'
};

router.post('/create', async (req, res) => {
  console.log("User Create");
  const { name, email, password, role } = req.body;
  const id = 1;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (userExist) {
      return res.status(200).json({ message: "Email already exist" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
        type_user: role,
        is_auth: false,
      }
    })

    console.log(user);

    return res.status(200).json({ 
      message: "User created",
      id: user.id,
      email: user.email,
      role: user.type_user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while generating the user" });
  }
});

router.post('/login', async (req, res) => {
  console.log("User Login");
  const { email, password  } = req.body;

  const userEmail = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!userEmail) {
    return res.status(200).json({ message: "Invalid user or password"});
  }
  const hashed_password = userEmail.password;

  try {
    bcrypt.compare(password, hashed_password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(200).json({ message: "Error while validating user"});
      }
      if (result) {
        return res.status(200).json({
          message: "Login successful",
          id: userEmail.id,
          email: userEmail.email,
          role: userEmail.type_user
        });
      } else {
        return res.status(200).json({ message: "Invalid user or password"});
      }
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while validating user"});
  }
});

router.post('/filecreate', upload.single('image'), async(req, res) => {
  const { name, desc} = req.body;
  try{
    return res.status(200).json({
      message: 'Archivo subido exitosamente',
      file: req.file.originalname,
      additionalData: { name, desc },
    });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while creating user" });
  }
});

router.get('/about', async (req, res) => {
  console.log("User started communication");
  
  try {
    return res.status(200).json({ 
      Body: "Nothing gg, but working :)"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


export default router;