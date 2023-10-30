var express = require('express');
var router = express.Router();
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
let content = require("../content.json");

/* GET home page. */
router.get('/', async function(req, res, next) {
 let my_file = await s3.getObject({
    Bucket: "cyclic-fluffy-rose-pumps-eu-north-1",
    Key: "content.json"
 }).promise()
 const result = JSON.parse(my_file.Body)?.content;
 if(!my_file.Body) {
  res.json({
    status: "fail"
  })
 } else {
  res.json({
    status: "success",
    content: result
  })
 }
});

router.post('path', async (req, res) => {
const {content} = req.body;
const contentObj = {
  content: content
}
await s3.putObject({
  Body: JSON.stringify(contentObj, null, 2),
  Bucket: "cyclic-fluffy-rose-pumps-eu-north-1",
  Key: "content.json" 
}).promise()
if(content == null) {
  res.json({
    status: "fail"
  })
} else {
  res.json({
    status: "success",
    content: content
  })
}
});

module.exports = router;
