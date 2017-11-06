var db = require('../api/dbconnection');

var launch = {
    validateUrl: function (prjid, uniqueid, callback) {
      db.query('select count(*) as count from projects where projectid=? and uniqueid=?', [prjid, uniqueid], callback)
    },
    getAllContent: function (tblname, callback) {
      db.query('select * from ?? order by stepnumber', [tblname], callback)
    }
}
module.exports = launch;
