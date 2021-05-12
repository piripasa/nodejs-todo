import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.mjs';
import { success, validation } from '../responseApi.mjs';
import { loginValidation, registerValidation } from '../Validation.mjs';
const { sign } = jsonwebtoken;
const { compare, genSalt, hash } = bcryptjs;


export function userRegister(req, res) {
    // Validate User
    const { error } = registerValidation(req.body);
    if (error) return res.status(422).json(validation(error.details)); //res.status(400).send(error.details[0].message);

    // Check if User already in database
    const emailExist = User.findOne({ email: req.body.email });
    if (emailExist) return res.status(422).json(validation([{ message: 'Email already exists' }]));

    // Hash Passwords
    const salt = genSalt(10);
    const hashedPassword = hash(req.body.password, salt);

    // Validated And Create User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = user.save();
        res.json({ name: user.name, email: user.email });
    } catch (err) {
        res.json({ message: err });
    }
}

export function userLogin(req, res) {

    const { error } = loginValidation(req.body);
    if (error) return res.status(422).json(validation(error.details));

    // Check if Email Exists
    const user = User.findOne({ email: req.body.email });
    if (!user) return res.status(422).json(validation({ message: 'Email Does Not Exist' }));

    const validPass = compare(req.body.password, user.password)
    if (!validPass) return res.status(422).json(validation({ message: 'Invalid Password' }));

    // Create & Assign Token
    const token = sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.status(200).json(success("OK", { access_token: token }, res.statusCode));
}