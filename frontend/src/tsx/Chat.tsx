import * as React from 'react';
import { ChatHistory } from './../tsx/ChatHistory';
import { ModalSettings } from './../tsx/modal';
import {
    sendMessage,
    connectSocket,
    openSocket,
    createRoom,
    RepeatKey,
    closeSocket,
    CreateRoom,
} from '../api/socketio';
import {
    NewMessage
} from '../mvvm/Model/stateEffector';
import {
    SendMessage,
    Message,
} from '../types/types';
import {
    RsaKeys,
    encryptRSA,
} from './../utils/cry';

interface Props {
    user: string | null;
    room: string | null;
    uid: string | null;
    salt: string | null;
    rsa: RsaKeys | null;
    publicKey: string | null;
}

interface State {
    messageText?: string;
    message?: Message;
    messageList?: Message[];
}
  
export class ChatInterface extends React.Component<Props,State> {
    constructor(props: Props){
      super(props);
      this.state = {
        messageText: undefined,
        message: undefined,
        messageList: undefined,
      }
    }
  
    componentDidMount() {
        const { uid, user, room, salt, rsa } = this.props;
        openSocket();
        if (this.props.rsa && this.props.rsa.rsaPrivateKey) connectSocket(this.props.rsa.rsaPrivateKey);
        if (uid && user && room && salt && rsa) createRoom({
            room,
            initial: {
                uid: uid,
                name: user,
                publicKey: rsa.rsaPublicKey,
            }
        } as CreateRoom)
    }

    componentDidUpdate(prevProps: Props, _: State) {
        const { uid, user, room, salt, rsa } = this.props;
        if (prevProps.publicKey !== this.props.publicKey) {
            if (uid && user && room && salt && rsa) {
                RepeatKey({
                    room,
                    initial: {
                        uid: uid,
                        name: user,
                        publicKey: rsa.rsaPublicKey,
                    }
                } as CreateRoom)
            }
        }
    }

    componentWillUnmount() {
        closeSocket();
    }
  
    onChangeMessage = (e: any) => this.setState({ messageText: e.target.value })
  
    onSendMessage = (e: any) => {
        e.preventDefault();
        const { uid, user, room, salt, rsa, publicKey } = this.props;
        if (uid && user && room && salt && rsa && publicKey) {
            if (this.state.messageText) {
                sendMessage({
                    room: room,
                    author: user,
                    message: encryptRSA(publicKey, this.state.messageText),
                } as SendMessage);
                NewMessage({
                    room: room,
                    author: user,
                    message: this.state.messageText,
                } as SendMessage);
            }
        } else {
            alert('Select settings page and set uid && user && room && salt');
        }
    } 
  
    render() {
        return (
            <>
                <ModalSettings view={ false } />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                            <div className="scrollbar" id="style-3">
                                <div className="force-overflow">
                                    <ChatHistory />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                            <form onSubmit={ this.onSendMessage }>
                                <p><small>Message:</small></p>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" name="msgtext" onChange={ this.onChangeMessage } />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-chevron-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}