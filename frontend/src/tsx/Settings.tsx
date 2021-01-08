import React from "react";
import { EncriptMethods } from './../types/encryptMethodEnum';
import {
    changeUsername,
    changeRoom,
    changeSalt,
} from '../mvvm/Model/stateEffector';

interface Props {
    user: string | null;
    room: string | null;
    uid: string | null;
    salt: string | null;
}

interface State {
    method?: EncriptMethods;
    username?: string;
    salt?: string;
    room?: string;
}

export class Settings extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            method: undefined,
            username: undefined,
            salt: undefined,
            room: undefined,
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    componentDidMount() {
        const {
            uid,
            user,
            room,
            salt,
        } = this.props;
        if (uid || user || room || salt) this.initialState();
    }

    handleChangeInput(e: any) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSave = (e: any) => {
        e.preventDefault();
        if (this.state.username) changeUsername(this.state.username);
        if (this.state.room) changeRoom(this.state.room);
        if (this.state.salt) changeSalt(this.state.salt);
    }

    initialState = () => {
        this.setState({
            username: this.props.user ? this.props.user : undefined,
            room: this.props.room ? this.props.room : undefined,
            salt: this.props.salt ? this.props.salt : undefined,
        });
    }

    render() {
        return (
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-10">
                    <form onSubmit={ this.handleSave }>
                        <div className="row">
                            <div className="col-12 mt-3">
                                <p>Encrypt method:</p>
                                <select className="form-select form-select-sm" defaultValue="CrypticoRSA">
                                    <option value="CrypticoRSA">CrypticoRSA</option>
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <p>Username:</p>
                                <div className="input-group mb-3">
                                    <input className="form-control form-control-sm" type="text" name="username" value={ this.state.username ? this.state.username : '' } onChange={ this.handleChangeInput } />
                                </div>
                                <p>Salt:</p>
                                <div className="input-group mb-3">
                                    <input className="form-control form-control-sm" type="text" name="salt" value={ this.state.salt ? this.state.salt : '' } onChange={ this.handleChangeInput } />
                                </div>
                                <p>Room:</p>
                                <div className="input-group mb-3">
                                    <input className="form-control form-control-sm" type="text" name="room" value={ this.state.room ? this.state.room : '' } onChange={ this.handleChangeInput } />
                                </div>
                                <button type="submit" className="btn btn-sm  mt-3 btn-success">Change</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}