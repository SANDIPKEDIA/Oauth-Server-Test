const router = require('express').Router();
const OAuthServer = require('express-oauth-server');
const OAuthModel = require('../models/oauth');
const mongoose = require('mongoose');

const {getAccessToken} = require("../models/oauth")

let oauth = new OAuthServer({
    model: OAuthModel,
    debug: true
});

router.post('/oauth/access_token', oauth.token({
    requireClientAuthentication: {
        authorization_code: false,
        refresh_token: false
    }
}));

router.get('/oauth/authenticate', async (req, res, next) => {
    return res.render('authenticate')
});

router.post('/oauth/authenticate', async (req, res, next) => {

    let UserModel = mongoose.model('User');
    req.body.user = await UserModel.findOne({ username: req.body.username });
    console.log(req.body.user);
    return next();
}, oauth.authorize({
    authenticateHandler: {
        handle: req => {
            return req.body.user;
        }
    }
}));

router.get('/oauth/get-user', async (req, res,next) => {
    console.log("request---------------------------------------------->",req)
    const accesstoken =req.query.access_token
    console.log("accesstoken------------------->",accesstoken);
  const user =  await getAccessToken(accesstoken)
  res.send(user)
//    return next();
    
});

module.exports = router;