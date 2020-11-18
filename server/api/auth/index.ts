import express from 'express';
import passport from '../../service/passport';
const router = express.Router();

router.post('/login', (req: any, res, next) => {
    req.logout();
    passport.authenticate('local', (_, user, info) => {
        // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        // console.log(`req.user: ${JSON.stringify(req.user)}`);
        req.login(user, (err) => {
            if (user) {
                return res.status(200).json({ role: user.role });
            }
            return res.json(info);
        });
    })(req, res, next);
});

router.post('/logout', (req: any, res, next) => {
    req.logout();
    res.json({ message: 'logged out' });
});

export default router;
