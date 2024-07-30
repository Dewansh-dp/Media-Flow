import multer from "multer";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      // cb(error,destination folder)
      cb(null, "./public/temp");
   },
   filename: function (req, file, cb) {
      // cb(error,filename)
      cb(null, file.originalname);
   },
});

export const upload = multer({ storage: storage });
