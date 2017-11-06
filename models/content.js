var mysql = require('mysql');
var db = require('../api/dbconnection');

var content={
    getAllContent: function(tblname, callback){
        db.query('select * from ?? order by stepnumber',[tblname], callback)
    },
    getContentByID: function(tblname, id, callback){
        db.query('select * from ?? where id = ?', [tblname, id], callback)
    },
    getNextContent: function(tblname, id, callback){
        db.query('select * from ?? where id > ? limit 1', [tblname, id], callback)
    },
    getPreviousContent: function(tblname, id, callback){
        db.query('select * from ?? where id < ? order by id desc limit 1', [tblname, id], callback)
    },
    addContent: function(tblname, cntarr,  callback){
        db.query('select count(*) + 1 as count from ??',[tblname], function(err, rows){
            if(err){
                res.json(err)
            }else{
                var cnt = rows[0]['count'];
                db.query('insert into ?? (stepnumber, screentype, title, screenshot, description, incorrecttext, hotspotwidth, hotspotheight, hotspotleft, hotspottop, incorrectleft, incorrecttop, descriptionwidth, descriptionheight, descriptionleft, descriptionbottom, descriptionduration) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [tblname, cnt, cntarr.screentype, cntarr.title, cntarr.screenshot, cntarr.description, cntarr.incorrecttext, cntarr.hotspotwidth, cntarr.hotspotheight, cntarr.hotspotleft, cntarr.hotspottop, cntarr.incorrectleft, cntarr.incorrecttop, cntarr.descriptionwidth, cntarr.descriptionheight, cntarr.descriptionleft, cntarr.descriptionbottom, cntarr.descriptionduration], callback)
            }
        });   
    },
    editContent: function(tblname, id, cntarr, loggedInUser, callback){
        db.query('update ?? set versionnumber=versionnumber + 1, stepnumber=?, screentype=?, title=?, screenshot=?, description=?, incorrecttext=?, hotspotwidth=?, hotspotheight=?, hotspotleft=?, hotspottop=?, incorrectleft=?, incorrecttop=?, descriptionwidth=?, descriptionheight=?, descriptionleft=?, descriptionbottom=?,descriptionduration=?, lastmodified=? where id=?',[tblname, cntarr.stepnumber, cntarr.screentype, cntarr.title, cntarr.screenshot, cntarr.description, cntarr.incorrecttext, cntarr.hotspotwidth, cntarr.hotspotheight, cntarr.hotspotleft, cntarr.hotspottop,cntarr.incorrectleft, cntarr.incorrecttop, cntarr.descriptionwidth, cntarr.descriptionheight, cntarr.descriptionleft, cntarr.descriptionbottom, cntarr.descriptionduration, loggedInUser, id], callback)
    },
    deleteContent: function(tblname, id, stepno, callback){
        db.query('delete from ?? where id=?; update ?? set stepnumber=stepnumber-1 where stepnumber>?',[tblname, id, tblname, parseInt(stepno,10)], callback)
    },
    reorderContent: function(tblname, contentarray, loggedInUser, callback){
        var mysqlQuery ='';
        contentarray.forEach(function(cntarr) {
            // mysqlQuery += 'update `' + tblname + '` set stepnumber=' + cntarr.stepnumber + ', screentype=' + cntarr.screentype + ', title=' + cntarr.title + ', screenshot=' + cntarr.screenshot + ', description=' + cntarr.description + ', incorrecttext=' + cntarr.incorrecttext + ', hotspotwidth=' + cntarr.hotspotwidth + ', hotspotheight=' + cntarr.hotspotheight + ', hotspotleft=' + cntarr.hotspotleft + ', hotspottop=' + cntarr.hotspottop + ', incorrectleft=' + cntarr.incorrectleft + ', incorrecttop=' + cntarr.incorrecttop + ', descriptionwidth=' + cntarr.descriptionwidth + ', descriptionheight=' + cntarr.descriptionheight + ', descriptionleft=' + cntarr.descriptionleft + ', descriptionbottom=' + cntarr.descriptionbottom + ', descriptionduration=' + cntarr.descriptionduration+ ', lastmodified=' + loggedInUser +';'
            mysqlQuery += mysql.format('update ?? set stepnumber=?, screentype=?, title=?, screenshot=?, description=?, incorrecttext=?, hotspotwidth=?, hotspotheight=?, hotspotleft=?, hotspottop=?, incorrectleft=?, incorrecttop=?, descriptionwidth=?, descriptionheight=?, descriptionleft=?, descriptionbottom=?,descriptionduration=?, lastmodified=? where id=? and stepnumber<>?;',[tblname, cntarr.stepnumber, cntarr.screentype, cntarr.title, cntarr.screenshot, cntarr.description, cntarr.incorrecttext, cntarr.hotspotwidth, cntarr.hotspotheight, cntarr.hotspotleft, cntarr.hotspottop,cntarr.incorrectleft, cntarr.incorrecttop, cntarr.descriptionwidth, cntarr.descriptionheight, cntarr.descriptionleft, cntarr.descriptionbottom, cntarr.descriptionduration, loggedInUser, cntarr.id, cntarr.stepnumber])
        });
        db.query(mysqlQuery, callback)
    }
};

module.exports = content;