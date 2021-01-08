import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./db/db.json')
const db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ rooms: [] }).write();


const app = new Koa();
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
    // Private room subscription
    socket.on('subscribe', function(data: CreateRoom) {
        console.log('subscribe -> ', data.room);
        subscribeRoom(data.room, data.initial);
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('publickey', {
            publickey: data.initial.publicKey
        });
    });

    // Resending the key to the second user
    socket.on('repeatkey', function(data: CreateRoom) {
        socket.broadcast.to(data.room).emit('publickey', {
            publickey: data.initial.publicKey
        });
    });

    // Sending private keys
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
app.use(router.routes());
server.listen(3001);
