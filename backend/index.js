import express from "express";
import multer from "multer";
import fs from "node:fs";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db/prisma.js";

import userRoute from "./routes/user.js"

const PORT = 3000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({
  dest: `uploads/`,
});

app.use("/user", userRoute);

app.post(`/images/single`, upload.single('imagenPerfil'), (req,res)=>{
  console.log(req.file);
  saveImage(req.file);
  res.send('termina');
});

function saveImage(file){
  const path = `./uploads/${file.originalname}`;
  fs.renameSync(file.path, path);
  return path;
}

app.post('/images/multi', upload.array('photos', 10), (req, res)=>{
  req.files.map(saveImage);
  res.send('termina - multi');
});

app.get('/files', (req, res) => {
  const uploadDir = `uploads/`;
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer el directorio' });
    }
    res.json(files); 
  });
});

app.get('/files/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;
  res.download(filePath, filename, (err) => {
    if (err) {
      return res.status(500).send({ error: 'No se pudo descargar el archivo' });
    }
  });
});

app.listen(PORT, ()=>{
  console.log(`Server is now running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
