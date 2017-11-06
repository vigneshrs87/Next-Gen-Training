var db = require('../api/dbconnection');

var login = {
    registerUser: function(userarr, callback){
        userdata = userarr[0];
        db.query('insert into users (username, password, firstname, lastname, role) values (?,?,?,?,"")',[userdata.username, userdata.password, userdata.firstname, userdata.lastname],callback)
    },
    validateLogin: function(userarr, callback){
        userdata = userarr[0];
        db.query('select count(*) as count, username, firstname, lastname, recentproject, role from users where username=? and password=?',[userdata.username, userdata.password],callback)
    },
    updateUser: function(userarr, callback){
        userdata = userarr[0];
        db.query('update users set username=?, password=?, firstname=?, lastname=?',[userdata.username, userdata.password, userdata.firstname, userdata.lastname],callback)
    }

}

module.exports= login;