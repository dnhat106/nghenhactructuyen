const Song = require('../models/Song');

// Lấy tất cả bài hát
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate('genre');
        res.status(200).json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách bài hát',
            error: error.message
        });
    }
};

// Lấy một bài hát theo ID
exports.getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate('genre');
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài hát'
            });
        }
        res.status(200).json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy thông tin bài hát',
            error: error.message
        });
    }
};

// Tạo bài hát mới
exports.createSong = async (req, res) => {
    try {
        const song = await Song.create(req.body);
        res.status(201).json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo bài hát mới',
            error: error.message
        });
    }
};

// Cập nhật bài hát
exports.updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài hát'
            });
        }
        res.status(200).json({
            success: true,
            data: song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật bài hát',
            error: error.message
        });
    }
};

// Xóa bài hát
exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài hát'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Đã xóa bài hát thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa bài hát',
            error: error.message
        });
    }
};

// Tìm kiếm bài hát
exports.searchSongs = async (req, res) => {
    try {
        const { keyword } = req.query;
        const songs = await Song.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { artist: { $regex: keyword, $options: 'i' } }
            ]
        }).populate('genre');
        
        res.status(200).json({
            success: true,
            count: songs.length,
            data: songs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tìm kiếm bài hát',
            error: error.message
        });
    }
};
