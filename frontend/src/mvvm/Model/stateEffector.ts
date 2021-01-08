import { createStore, createEvent } from 'effector'
import { Message } from "./../../types/types";
import { uid } from './../../utils/oid';
import {
    generateRSA,
    RsaKeys,
}  from '../../utils/cry';

// History message store
const initialState: Message[] = [];
export const MessageList = createStore(initialState as Message[]);
export const NewMessage  = createEvent<Message>();
MessageList.on(NewMessage, (state, msg) => [...state, msg]);
MessageList.watch(state => console.log('Store -> Messages:', state))

// UserUid store
const initialUid: string = uid();
export const Uid = createStore(initialUid as string);
export const changeUid  = createEvent<string>();
Uid.on(changeUid, (_, id) => id);
Uid.watch(state => console.log('Store -> uid:', state))

// Username store
const initialUsername: string | null = null;
export const Username = createStore(initialUsername as string | null);
export const changeUsername  = createEvent<string>();
Username.on(changeUsername, (_, t) => t);
Username.watch(state => console.log('Store -> Username:', state))

// Salt store
const initialSalt: string | null = null;
export const Salt = createStore(initialSalt as string | null);
export const changeSalt  = createEvent<string>();
Salt.on(changeSalt, (_, t) => t);
Salt.watch(state => {
    console.log('Store -> Salt:', state)
    if (state) changeRSA(state);
})

// RSAkeys store
const initialRSA: RsaKeys | null = null;
export const RSA = createStore<RsaKeys | null >(initialRSA);
export const changeRSA  = createEvent<string>();
RSA.on(changeRSA, (_, t) => generateRSA(t));
RSA.watch(state => console.log('Store -> RsaKeys:', state))

// interlocutor publicKey store
const initialPublicKey: string | null = null;
export const PublicKey = createStore<string | null >(initialPublicKey);
export const changePublicKey  = createEvent<string>();
PublicKey.on(changePublicKey, (_, t) => t);
PublicKey.watch(state => console.log('Store -> PublicKey:', state))

// Roomname store
const initialRoom: string | null = null;
export const roomName = createStore(initialRoom as string | null);
export const changeRoom  = createEvent<string>();
roomName.on(changeRoom, (_, t) => t);
roomName.watch(state => console.log('Store -> Room:', state))