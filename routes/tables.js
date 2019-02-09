var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mydb', ['tables']);

// Get All tables
router.get('/tables', function(req, res, next){
    db.tables.find(function(err, tables){
        if(err){
            res.send(err);
        }
        res.json(tables);
    });
});

// Get Single Table
router.get('/table/:id', function(req, res, next){
    db.tables.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, table){
        if(err){
            res.send(err);
        }
        res.json(table);
    });
});


module.exports = router;