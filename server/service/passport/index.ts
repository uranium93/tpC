import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../../model/Users';
import bcrypt from 'bcrypt';

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({ where: { email } });
        if (user && email === user.email && bcrypt.compareSync(`${password}`, user.password)) {
            user.password = '';
            return done(null, user);
        }
        return done(null, false, { message: 'wrong email or password' });
    }),
);

passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here');
    done(null, { id: user.id, role: user.role });
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
