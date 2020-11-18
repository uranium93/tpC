import { Router } from 'express';
import Users from '../../model/Users';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/addUser', async (req: any, res) => {
    try {
        const { userEmail, password, firstName, lastName, role } = req.body;
        if (!req.user || req.user.role !== 'admin') {
            return res.status(401).json({ message: 'You Are Not Allowed To Add User' });
        }
        if (role === 'admin') {
            return res.status(401).json({ message: 'You cant Add An Admin' });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await Users.findOne({ where: { email: userEmail } });
        if (user) {
            return res.status(500).json({ message: 'User already exist' });
        }
        const CR_User = await Users.create({ email: userEmail, password: hashedPassword, role, lastName, firstName });
        await CR_User.save();
        return res.json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
});

router.post('/addAdmin', async (req: any, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const admin = await Users.findOne({ where: { email } });
        if (admin) {
            return res.status(500).json({ message: 'Admin already exist' });
        }
        const CR_Admin = await Users.create({ email, password: hashedPassword, role: 'admin', lastName, firstName });
        await CR_Admin.save();
        return res.json({ message: 'admin created' });
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong' });
    }
});
export default router;
