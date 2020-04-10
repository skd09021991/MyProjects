const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );


const router = express.Router();

/**
 * file  STORING STARTS
 */
const s3 = new aws.S3({
	accessKeyId: 'AKIAIQ332UEJDVV63EYA',
	secretAccessKey: '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',
	Bucket: 'adprobe-website'
});



/**
 * Single Upload
 */
const fileUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'adprobe-website',
		
		key: function (req, file, cb) {
            cb(null, path.basename( 'Resumes') + '/' + file.originalname )
            
            
		}
	}),
	
}).single('file-upload');



/**
 * @route POST /api/profile/fil-upload
 * @desc Upload post fil
 * @access private because of ACL in parameters which we are sending 
 */
router.post( '/upload', ( req, res ) => {
	fileUpload( req, res, ( error ) => {
		console.log( 'requestOkokok', req.file );
		console.log( 'error', error );
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				const fileName = req.file.key;
				const fileLocation = req.file.location;
// Save the file name into database 
				res.json( {
					file: fileName,
					location: fileLocation
				} );
			}
		}
	});
});

module.exports = router;
