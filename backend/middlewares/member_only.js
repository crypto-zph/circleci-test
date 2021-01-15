module.exports = (req, res, next) =>
{
    if (!req.session.user_info)
    {
        return res.status(500).send({ auth: false, message: 'Please login to continue.' });
    }
    else
    {
    	delete req.session.user_info.salt;
        delete req.session.user_info.hash;
        req.user_info = req.session.user_info;

        next();
    }
}