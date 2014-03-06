module.exports = {
    index: function(req, res){
        console.log(req.user);
        res.render('index', {title: "Passport App",
            username: req.user.userName
    });

    }
}