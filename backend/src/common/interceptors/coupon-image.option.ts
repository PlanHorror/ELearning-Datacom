import { UnsupportedMediaTypeException } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const CouponImageOption = {
  storage: memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException(), false);
    }
  },
};
