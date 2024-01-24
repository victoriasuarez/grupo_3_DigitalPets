const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, path.resolve(__dirname, '../public/images/users'));
    // },
    destination: (req, file, cb) => {
		var folder = new String();
		if (file.fieldname.includes("producto-img")) {
			folder = path.join(__dirname, '../public/images');
		} else {
			folder = path.join(__dirname, '../public/images/users');
		}
		cb(null, folder);
	},
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    // filename: (req, file, cb) => {
	// 	var fileName = new String();
	// 	let field = file.fieldname
	// 	if (field.includes("product-img")) {
	// 		fileName = `${Date.now()}_product${path.extname(file.originalname)}`;
	// 	} else {
	// 		fileName = `${Date.now()}_user${path.extname(file.originalname)}`;
	// 	}
		
	// 	cb(null, fileName);
	// },
});



const upload = multer({ storage: storage });

module.exports = upload;