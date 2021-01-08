export interface SendMessage {
    room: string;
    author: string;
    message: string;
}

export interface Message {
    author: string;
    message: string;
}

export interface ChatState {
    messages: Message[];
}