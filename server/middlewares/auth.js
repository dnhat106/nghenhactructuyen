const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        // Kiểm tra token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Không có quyền truy cập. Vui lòng đăng nhập.'
            });
        }

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Kiểm tra user còn tồn tại không
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng không tồn tại'
            });
        }

        // Gán user vào request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Không có quyền truy cập'
        });
    }
};
