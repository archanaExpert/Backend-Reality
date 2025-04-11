const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).send({ message: 'Name, email, password, and phone number are required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; 
        const phoneRegex = /^[0-9]{10}$/; 

        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: 'Invalid email format' });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: 'Password must be at least 6 characters and include at least one letter and one number' });
        }

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).send({ message: 'Phone number must be 10 digits' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phoneNumber });

        await newUser.save();

        res.status(201).send({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({ message: 'Internal server error', error });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
      
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).send({
                message: "Password must be at least 6 characters and include at least one letter and one number"
            });
        }

        const existedUser = await User.findOne({ email });

        if (!existedUser) {
            return res.status(400).send({ message: "Email does not exist" });
        }

        const existPassword = await bcrypt.compare(password, existedUser.password);

        if (!existPassword) {
            return res.status(400).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: existedUser._id }, "Expert", { expiresIn: "10d" });

        res.status(200).send({ message: "User logged in successfully", token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
};
