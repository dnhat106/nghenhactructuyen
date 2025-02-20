require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const categoryRoutes = require('./routes/categories');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nghenhactructuyen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Đã kết nối với MongoDB'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/categories', categoryRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Music API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});
