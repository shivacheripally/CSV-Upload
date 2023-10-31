class uploadController {

    static upload_file = function(req, res){
        res.render('home', {
            title: "Home | Page"
        })
    }

}

module.exports = uploadController;