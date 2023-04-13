const multer = require('multer');
const path = require('path');

const validateImage = (req, res) => {
  
  const multerStorage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images'),
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}${Date.now()}.${ext}`);
    },
  });

  const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidationError = 'You can upload only image files';
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  };

  const upload = multer({ storage: multerStorage, imageFileFilter }).single(
    'image'
  );
  return upload;
};

const validateText = (req, res) => {
  const multerStorage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/text'),
    filename: (req, file, cb) => {
      let ext = file.mimetype.split('/')[1];
      if (ext === 'octet-stream') ext = 'txt';
      if (ext === 'vnd.openxmlformats-officedocument.wordprocessingml.document')
        ext = 'docx';

      cb(null, `${file.fieldname}${Date.now()}.${ext}`);
    },
  });

  const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(txt|docx)$/)) {
      req.fileValidationError = 'You can upload only text files';
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  };

  const upload = multer({ storage: multerStorage, imageFileFilter }).single(
    'file'
  );
  return upload;
};

module.exports = { validateImage, validateText };
