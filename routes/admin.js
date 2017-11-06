var express = require('express');
var router = express.Router();
var admin = require('../models/admin');

router.get('/', function(req, res, next){
    admin.getUsers(function(err, rows){
        if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
    })
});

router.put('/:id/:role', function(req, res, next){
    admin.updateUser(req.params.id, req.params.role, function(err, rows){
        if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
    })
});

router.delete('/:id', function(req, res, next){
    admin.deleteUser(req.params.id, function(err, rows){
        if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
    })
});

module.exports = router;