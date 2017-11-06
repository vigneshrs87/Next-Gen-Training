var express = require('express');
var router = express.Router();
var content = require('../models/content');

router.get('/:tblname?/:id?/:type?', function (req, res, next) {
  if (req.params.tblname && req.params.id && req.params.type === 'next') {
    content.getNextContent(req.params.tblname, req.params.id, function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  } else if (req.params.tblname && req.params.id && req.params.type === 'previous') {
    content.getPreviousContent(req.params.tblname, req.params.id, function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  } else if (req.params.tblname && req.params.id) {
    content.getContentByID(req.params.tblname, req.params.id, function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  } else {
    content.getAllContent(req.params.tblname, function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  }
});

router.post('/:tblname', function (req, res, next) {
  content.addContent(req.params.tblname, req.body, function (err, rows) {
    if (err) {
      res.json(err)
    } else {
      res.json(rows)
    }
  })
});

router.put('/:tblname/:id/', function (req, res, next) {
  if (req.params.id === 'reorder') {
    content.reorderContent(req.params.tblname, req.body[0], req.body[1], function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  }else{
    content.editContent(req.params.tblname, req.params.id, req.body[0], req.body[1], function (err, rows) {
      if (err) {
        res.json(err)
      } else {
        res.json(rows)
      }
    })
  }
});

router.delete('/:tblname/:id/:stepno', function (req, res, next) {
  content.deleteContent(req.params.tblname, req.params.id, req.params.stepno, function (err, rows) {
    if (err) {
      res.json(err)
    } else {
      res.json(rows)
    }
  })
});

module.exports = router;
