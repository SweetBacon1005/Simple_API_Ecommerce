// const jwt = require("jsonwebtoken");
// const userModel = require("../models/users");
// const User = require("../models/User");

// const loginCheck = async (req,res,next) => {
//     try {
//         let token = req.headers.token;
//         token = token.replace("Bearer ", "");
//         decode = jwt.verify(token, JWT_SECRET);
//         req.userDetails = decode;
//         next();
//     } catch (err) {
//         res.json({
//           error: "You must be logged in",
//         });
//     }
// }

// const isAuth = async (req, res, next) => {
//     let UserId = req.body;
//     if (

//     )
// }

// const isAdmin = async (req, res, next) => {
//     try {
//         let UserId = req.body;
//         let user = await User.findById(UserId);
//         if (user.userRole === "admin") {
//             next();
//         } else {
//             res.json({
//                 error: "You are not authorized to perform this action",
//             });
//         }
//     }
//     catch (err) {
//         res.json({
//             error: "You must be logged in",
//         });
//     }
// };
