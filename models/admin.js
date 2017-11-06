var db = require('../api/dbconnection');

var admin = {
    getUsers: function(callback){
        db.query('select * from users', callback)
    },
    updateUser: function(id, userRole, callback){
        console.log(userRole)
        db.query('update users set role=? where id=?',[userRole, id], callback)
    },
    deleteUser: function(id, callback){
        db.query('delete from users where id=?',[id], callback)
    }
}

module.exports = admin;