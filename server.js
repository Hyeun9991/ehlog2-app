import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import {
  errorResponserHandler,
  invalidPathHandler,
} from './middleware/errorHandler';

// Routes
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...!');
});

app.use('/api/users', userRoutes);

app.use(invalidPathHandler); // 존재하지 않는 경로 처리를 위한 미들웨어
app.use(errorResponserHandler); // 에러 핸들링을 위한 미들웨어

const PORT = process.env.PORT || 8123;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
