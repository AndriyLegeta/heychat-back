const express = require('express');
const mongoose = require('mongoose');
const database = require('./config/secrets');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


require('./socket/streams')(io);

const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const friendsRouter = require('./routes/friendsRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());


mongoose.connect(database.url, { useNewUrlParser: true });

app.use('/api/hey-chatapp', authRouter);
app.use('/api/hey-chatapp', postsRouter);
app.use('/api/hey-chatapp', userRouter);
app.use('/api/hey-chatapp', friendsRouter);


server.listen(3000, () => {
    console.log('Listening 3000 !');
});

