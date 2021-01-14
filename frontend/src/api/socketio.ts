import io from 'socket.io-client';
import {
  NewMessage,
  changePublicKey,
} from './../mvvm/Model/stateEffector';
import {
  decryptRSA,
} from './../utils/cry';
import {
  SendMessage
} from './../types/types';

//const socket = io('http://localhost:3001/');
const socket = io('https://encrypt-chat.ru/');

interface User {
  uid: string;
  name: string;
  publicKey: string;
}

export interface CreateRoom {
  room: string;
  initial: User;
}

export function sendMessage(message: SendMessage): void {
  if (message) socket.emit('send', {
    room: message.room,
    author:  message.author,
    message: message.message,
  });
}

export function connectSocket(privateKey: string): void {
  socket.on('connect', (s: any) => {
    console.log('socket.io->connect:', socket.id);
  });

  socket.on('private', (t: any, a: string) => {
    console.log('socket.io -> message:', t);
    let decryptMessage = decryptRSA(privateKey, t.message);

    console.log('socket.io -> privateKey:', privateKey);
    console.log('socket.io -> decryptMessage:', decryptMessage);

    NewMessage({
      author:  t.author,
      message: decryptMessage ? decryptMessage : '',
    });
  });

  socket.on('publickey', (data: any) => {
    if(data && data.publickey) changePublicKey(data.publickey)
  });

  socket.on("disconnect", () => {
    console.log('socket.io->disconnect:', socket.id); // undefined
  });
}

export function createRoom(room: CreateRoom): void {
  socket.emit('subscribe', room);
}

export function RepeatKey(room: CreateRoom): void {
  socket.emit('subscribe', room);
}

export function openSocket(): void {
  socket.open();
}

export function closeSocket(): void {
  socket.close();
}