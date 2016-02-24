/**
 * Created by user on 17/02/2016.
 */
var express = require('express');
var router = express.Router();
var models  = require('../../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'null' });
    models.User.findAll().then(function(rows){
        res.send(rows);
    })
});


router.post('/', function(req, res, next) {
    models.User.findOrCreate(
        {
            where: {
                mail : req.body.mail,
                username: req.body.username
            },
            defaults : {
                inscription : new Date(),
                password : req.body.password

            }
        })
        .spread(function(user, created){
            res.send(created);
        }).catch(function(e) {
            console.log("error");
            res.send(e);
        });
});

module.exports = router;
