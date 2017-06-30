exports.checkadmin = function(req,res,next)
{
    if(req.user.admin == true)
    {
        return next();
    }
    req.session.oldUrl = req.url;
    res.send('Bạn phải khong phải là admin');
}
exports.checkactive  = function(req,res,next)
{
    if(req.user.active == true)
    {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('Tài khoản chưa kích hoạt');
}