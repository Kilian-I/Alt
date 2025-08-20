const mongoose = require('mongoose');


mongoose

    .connect(process.env.DB_USER_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
