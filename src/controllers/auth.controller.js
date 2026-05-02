// const userModel = require("../models/user.model");
// const jwt = require("jsonwebtoken");

// async function registerUser(req, res) {
//     try {
//         const { username, email, password } = req.body;

//         // ✅ user create
//         const user = await userModel.create({
//             username,
//             email,
//             password
//         });

//         // ✅ token generate (user._id use karo)
//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET
//         );

//         // ✅ response
//         res.status(201).json({
//             message: "user registered successfully",
//             user,
//             token
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: error.message
//         });
//     }
// }

// module.exports = { registerUser };
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // ✅ 1. validation
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // ✅ 2. check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        // ✅ 3. hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ 4. create user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // ✅ 5. generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // optional but good
        );

        // ✅ 6. response
        res.status(201).json({
            message: "user registered successfully",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { registerUser };