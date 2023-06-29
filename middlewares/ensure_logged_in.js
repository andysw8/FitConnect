function ensureLoggedIn(req, res, next) {
    if(req.session.userId){
        console.log('userId retrieved', req.session.userId)
        return next()
    }
    res.redirect('/login')
}

module.exports = ensureLoggedIn