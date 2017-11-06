var express = require('express');
var router = express.Router();
var launch = require('../models/launch');

router.get('/:prjid/:uniqid', function (req, res, next) {
  launch.validateUrl(req.params.prjid, req.params.uniqid, function (err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows[0]['count'] === 1) {
        launch.getAllContent(req.params.prjid, function (err, rows) {
          if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
        })
      }else{
          res.json("check url");
      }
    }
  })

});
module.exports = router;
