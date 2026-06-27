const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const mongoose = require('mongoose');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.once('open', async () => {
  const User = require('./models/User');
  const bcrypt = require('bcrypt');
  const existing = await User.findOne({ email: 'misbah@gmail.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('123456', 10);
    await User.create({ name: 'Misbah', email: 'misbah@gmail.com', password: hashed, role: 'librarian' });
    console.log('Default user seeded ✅');
  }
});