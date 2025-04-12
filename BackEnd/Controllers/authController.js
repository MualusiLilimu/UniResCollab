const googleCallback = (req, res) => {
    res.redirect('/Admin/Home');
};

const githubCallback = (req, res) => {
    res.redirect('/Admin/Home');
};

const facebookCallback = (req, res) => {
    res.redirect('/Admin/Home');
};

const microsoftCallback = (req, res) => {
    res.redirect('/Admin/Home');
};

const linkedinCallback = (req, res) => {
    res.redirect('/Admin/Home');
};

const loginPage = (req, res) => {
    res.send(`
        <a href="/auth/google">Login with Google</a><br>
        <a href="/auth/github">Login with GitHub</a><br>
        <a href="/auth/microsoft">Login with Microsoft</a>
    `);
};

module.exports = {
    googleCallback,
    githubCallback,
    facebookCallback,
    microsoftCallback,
    linkedinCallback,
    loginPage,
};
