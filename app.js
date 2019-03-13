const express = require('express');
const mongoose = require('mongoose');
const database = require('./config/secrets');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const _ = require('lodash');

const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
/*

const { User } = require('./Helpers/UserClass');

require('./socket/streams')(io, User, _);
require('./socket/private')(io);*/

require('./socket/streams')(io);

const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postRouter');
/*const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
const image = require('./routes/imageRoutes');*/

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
/*app.use(logger('dev'));*/

mongoose.connect(database.url, { useNewUrlParser: true });

app.use('/api/hey-chatapp', authRouter);
app.use('/api/hey-chatapp', postsRouter);
/*app.use('/api/hey-chatapp', users);
app.use('/api/hey-chatapp', friends);
app.use('/api/hey-chatapp', message);
app.use('/api/hey-chatapp', image);*/

server.listen(3000, () => {
    console.log('Listening 3000 !');
});
