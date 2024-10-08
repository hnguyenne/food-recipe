function login(req, res, next) {
    res.status(200).json({ message: 'Logged in successfully' });
    next();
}

function logout(req, res, next) {
    res.status(200).json({ message: 'Logged out successfully' });
    next();
}

function register(req, res, next) {
    res.status(200).json({ message: 'Register successfully' });
    next();
}

function getProfile(req, res){
    res.status(200).json({ message: 'Profile fetched successfully' });
}

function updateProfile(req, res){
    res.status(200).json({ message: 'Profile updated successfully' });
}

module.exports = {
    login,
    logout,
    register,
    getProfile,
    updateProfile,
};