import fs from'fs';
import path from'path';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./db/db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ rooms: [] }).write();


const app = new Koa();logger
app.use(serve('./public'));
app.use(logger());
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);


interface User {
    uid: string;
    name: string;
    publicKey: string;
}
interface Rooms {
    room?: string;
    initial?: User;
    invited?: User;
}
interface CreateRoom {
    room: string;
    initial: User;
}

function subscribeRoom(Room: string,  initial: User) {
    const data: any = db.get<string>('rooms');
    const room = data.find({ room: Room }).value();
    if (room) {
        data.find({ room: Room }).set('invited', { uid: initial.uid, name: initial.name, publicKey: initial.publicKey}).write()
        const findedRoom: Rooms = data.find({ room: Room }).value();
        return {
            status: 'join',
            decripterKey: findedRoom.initial.publicKey,
        }
    } else {
        data.push({ room: Room, initial: { uid: initial.uid, name: initial.name, publicKey: initial.publicKey}}).write();
        return {
            status: 'create',
            decripterKey: undefined,
        }
    }
}

io.sockets.on('connection', function (socket) {
    console.log('connection:', socket.id );
    socket.on('subscribe', function(data: CreateRoom) {
        console.log('subscribe -> ', data.room);
        subscribeRoom(data.room, data.initial);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('publickey', {
            publickey: data.initial.publicKey
        });
    });
    socket.on('repeatkey', function(data: CreateRoom) {
        socket.broadcast.to(data.room).emit('publickey', {
            publickey: data.initial.publicKey
        });
    });
    socket.on('send', function(data: any) {
        console.log('sending -> ', data.room);
        socket.broadcast.to(data.room).emit('private', {
            author:  data.author,
            message: data.message
        });
    });
});

const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'Encrypted server worked.';
});
router.get('(.*)', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(path.join('./public', 'index.html')), 'utf8')
});

app.use(router.routes());
server.listen(3001);