'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        
        //console.log(req.user, req.profile, req);
        // if (req.profile.id != req.user.id) {
        if (req.user.id) {
            next();
            return;
        }

        return res.send(401, 'User is not authorized');
    }
};

/**
 * Article authorizations routing middleware
 */
exports.article = {
    hasAuthorization: function(req, res, next) {
        

        if (req.user.id) {
            next();
            return;
        }
        

        return res.send(401, 'User is not authorized');
        
        next();
    }
};