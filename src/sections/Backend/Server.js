import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/milky-web';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'uploads')));

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  landmark: { type: String, required: false },
  pincode: { type: String, required: false },
  phoneNo: { type: String, required: false },
  profilePicture: { type: String, required: false },
  deliveryAddress: { type: String, required: false },
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

app.post('/api/signup', upload.single('profilePicture'), async (req, res) => {
  const { firstname, lastname, email, password, address, landmark, pincode, phoneNo, profilePicture } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
    console.log('profilePicture', profilePicture);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword, address, landmark, pincode, phoneNo, profilePicture });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Failed to register user', error: error.message });
  }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    user = await User.findById(user._id);
    const { firstname, lastname, email, address, landmark, pincode, phoneNo, profilePicture } = user;

    res.json({ success: true, message: 'User signed in successfully', token ,firstname, lastname, email, address, landmark, pincode, phoneNo, profilePicture});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to sign in user', error: error.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
}
/*app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { firstname, lastname, email, address, landmark, pincode, phoneNo, profilePicture } = user;
    res.json({ success: true, firstname, lastname, email, address, landmark, pincode, phoneNo, profilePicture});
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user profile', error: error.message });
  }
});
*/

app.put('/api/users/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, address, landmark, pincode, phoneNo } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstname,
      lastname,
      email,
      address,
      landmark,
      pincode,
      phoneNo,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
});

app.delete('/api/users/delete-by-email', authenticateToken, async (req, res) => {
  const { email } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found with the provided email' });
    }

    res.json({ success: true, message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user by email:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user by email', error: error.message });
  }
});

app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});


app.get('/api/nearby-users', authenticateToken, async (req, res) => {
  const { pincode } = req.query;

  try {
    const nearbyUsers = await User.find({ pincode }).select('firstname lastname email address landmark pincode phoneNo');
    res.json(nearbyUsers);
  } catch (error) {
    console.error('Error fetching nearby users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch nearby users', error: error.message });
  }
});
// Example route to update user profile with deliveryAddress
app.put('/api/users/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, address, landmark, pincode, phoneNo, deliveryAddress } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstname,
      lastname,
      email,
      address,
      landmark,
      pincode,
      phoneNo,
      deliveryAddress, // Include deliveryAddress in update
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
