const multer = require('multer');
const path = require('path');

// configure storage (we are going to store files in the 'uploads' folder)
const storage = multer.diskStorage(
    {
        destination : (req,file,cb)=>{
            cb(null, '/uploads');
        },
        filename : (req,file,cb)=>{
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
);


// file filter to allow only specific file types
const fileFilter = (req, file, cb) => {

// make an array of allowed file types
const allowedType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

// check if the file type is allowed
if(allowedType.includes(file.mimetype)){
    cab(null,true);
}
else{
    cb(null,false);
}

}

// multer middleware
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

module.exports = upload;