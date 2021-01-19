import path from "path";
import express from "express";
import fs from "fs";
import multer from "multer";
import { admin, processToken } from "../middleware/authMiddleware.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router
  .route("/")
  .post(processToken, admin, upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
  });

router.route("/:fileName").delete(processToken, admin, (req, res) => {
  try {
    const __dirname = path.resolve();
    let pathToFile = path.join(__dirname, req.params.fileName);
    fs.unlinkSync(pathToFile);
    res.status(200);
    res.send(pathToFile);
  } catch (error) {
    res.status(200);
    res.send(error);
  }
});

export default router;
