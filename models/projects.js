var db=require('../api/dbconnection');

var projects = {
    getAllProjects:function(callback){
        return db.query('select * from projects',callback);
    },
    getActiveProject:function(callback){
        return db.query("select * from projects where projects.projectstatus<>'completed'",callback)
    },
    getProjectByStatus:function(sts,callback){
        return db.query('select * from projects where projects.projectstatus=?',[sts],callback)
    },
    getProjectById:function(id,callback){
        return db.query('select * from projects where projects.projectid=?',[id],callback);
    },
    addProject:function(project,callback){
        return db.query('Insert into projects (projectname, projectstartdate, projectenddate, projectsme, projectstatus, projectrelease, uniqueid) values (?,?,?,?,?,?,?)',[project.projectname,project.projectstartdate,project.projectenddate,project.projectsme,project.projectstatus,project.projectrelease,project.projectuniqueid],function(err, results){
            if(err){
                res.json(err);
            }else {
                var prefix = '000000';
                prefix = prefix.slice(0, '-' + results.insertId.toString().length);
                db.query('create table `' + prefix + results.insertId.toString() + '` like practice_model; create table `' + prefix + results.insertId.toString() + '_version` like practice_model; ', callback)
            }
        })
    },
    editProject:function(id,project,callback){
        return db.query('update projects set projectname=?, projectstartdate=?, projectenddate=?, projectsme=?, projectstatus=?, projectrelease=? where projectid=?',[project.projectname,project.projectstartdate,project.projectenddate,project.projectsme,project.projectstatus,project.projectrelease,id],callback)
    },
    deleteProject:function(id,callback){
        return db.query('delete from projects where projectid=?; drop table ??',[id, id],callback);
    },
    updateRecentProject: function(prjdetails, usrid, callback){
        return db.query('update users set recentproject=? where username=?',[prjdetails, usrid], callback);
    }

};

module.exports=projects;