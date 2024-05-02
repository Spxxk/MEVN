export function isAuthenticated (req, res, next) {
    // Passport adds 'req.user' property if user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, proceed to the next middleware
        return next();
    }
    // User is not authenticated, redirect to login page or send error response
    res.redirect('/dashboard'); // Redirect to login page
};

// Middleware function to check if user has specific role/permission
export function hasPermission (requiredRole) {
    return (req, res, next) => {
        // Check if user has the required role/permission
        console.log(req.user);
        if (req.user && req.user.role === requiredRole) {
            // User has the required role/permission, proceed to the next middleware
            return next();
        }
        // User does not have the required role/permission, send error response
        res.status(403).send('Forbidden'); // Send 403 Forbidden status
    };
};