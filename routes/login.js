var express = require('express');
var router = express.Router();
var login = require('../models/login');

router.post('/:tsk?', function(req,res,next){
    if(req.params.tsk == 'register'){
    login.registerUser(req.body,function(err,rows){
        if(err){
            res.json(err)
        }else{
            res.json(rows)
        }
    })}else{
        login.validateLogin(req.body,function(err,value){
            if(err){
                res.json(err)
            }else{
                res.send(value)
            }
        })
    }
});

module.exports = router;