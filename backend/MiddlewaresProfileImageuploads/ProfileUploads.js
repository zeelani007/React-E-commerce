import  multer  from "multer";
import  path  from "path";
import  fs  from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profileImage/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) return cb(null, true);
    cb("Error: Images Only!");
  },
});



export default upload;
