module.exports = (req, res, next) =>
{
    if (!req.session.admin_user)
    {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token - Admin.' });
    }
    else
    {
        delete req.session.admin_user.password;
        req.admin_info = req.session.admin_user;

        next();
    }
}