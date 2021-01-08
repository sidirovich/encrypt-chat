import { ChatDomain } from "./domainEffector";
import { Message } from "./../../types/types";


export const sendMessage = ChatDomain.effect<Message, Message, Error>();

export const getMessage = ChatDomain.effect<Message, Message, Error>();