var express = require('express');
var router = express.Router();
var projects = require('../models/projects');

router.get('/:id?', function (req, res, next) {
  if (req.params.id && isNaN(req.params.id)) {
    if (req.params.id == 'active') {
      projects.getActiveProject(function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      })
    } else {
      projects.getProjectByStatus(req.params.id, function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      })
    }
  } else if (req.params.id && !isNaN(req.params.id)) {
    projects.getProjectById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    })
  } else {
    projects.getAllProjects(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function (req, res, next) {
  projects.addProject(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put('/:id', function (req, res, next) {
  if (req.params.id === 'updaterecent') {
    projects.updateRecentProject(req.body[0], req.body[1], function (err, count) {
      if (err) {
        res.json(err);
      } else {
        res.json(count);
      }
    })
  } else {
    projects.editProject(req.params.id, req.body, function (err, count) {
      if (err) {
        res.json(err);
      } else {
        res.json(count);
      }
    });
  }
});

router.delete('/:id', function (req, res, next) {
  projects.deleteProject(req.params.id, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  })
})

module.exports = router;
