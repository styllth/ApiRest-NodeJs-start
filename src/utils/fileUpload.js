// Refer https://www.youtube.com/watch?v=ASuU4km3VHE&t=380s&list=WL&index=22
// For reference

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = require('../environment');

// AWS S3 IAM configurations
aws.config.update({
  secretAccessKey: env.awsS3Bucket.secretAccessKey,
  accessKeyId: env.awsS3Bucket.accessKeyId,
  region: env.awsS3Bucket.region
});

const s3 = new aws.S3();

// Multer configurations for uploading file in S3 bucket
const upload = multer({
  
  storage: multerS3({
    s3,
    bucket: env.awsS3Bucket.bucket,

    // giving read access to all users
    acl: 'public-read',

    metadata: function (req, file, cb) {
      cb(null, { count : req.query.count});
    },

    // Key is the name assigned to uploaded file in S3 bucket, here it is time stamp
    key: function (req, file, cb) {
      cb(null, req.query.userId + Date.now().toString())
    }
  }),
  // File upload Limit 100mb in byte
  limits: { fileSize: 101000000 }
})

module.exports = upload;
