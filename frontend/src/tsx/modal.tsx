import * as React from "react";

interface Props {
    view: boolean;
}

export class ModalSettings extends React.Component<Props,{}> {
    render() {
        return this.props.view ? (
            <div className="backgound-popup">
                <div className="content-popup">
                    <div className="row">
                        <div className="col-12">
                            <h2>Settings</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <p>Description:</p>
                                        <p><small>Our server does not record user data, as well as message history. The server does not use the database, sessions and proxy cache. But your messages can be saved or processed by the provider or hosting middleware.</small></p>
                                        <p><small>The salt of your hash is used as the name of the room.</small></p>
                                        <p><small>Nobody knows the salt for decoding, so that you can communicate with your interlocutor, tell him the salt in advance. In any secure way. This chat allows you to exchange instant messages, by prior agreement on the terms of communication.</small></p>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <p>Encrypt method:</p>
                                        <select className="form-select form-select-sm" aria-label="Default select example" defaultValue="AES">
                                        <option value="AES" selected>CryptoJS.AES</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <p>Salt:</p>
                                        <input className="form-control form-control-sm" type="text" name="salt" placeholder="Set secret salt" />
                                        <p>Room:</p>
                                        <input className="form-control form-control-sm" type="text" name="room" placeholder="Set socket.io room" />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <hr />
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="row">
                                                <div className="col-12">
                                                    <p>Generate room:</p>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label">Number</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label">Char</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-group mb-3">
                                                    <button className="btn btn-sm btn-outline-light" type="button" id="button-addon2">Generate</button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                <div className="col-12">
                                                    <p>Generate salt:</p>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label">Number</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label">Char</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="input-group mb-3">
                                                    <button className="btn btn-sm btn-outline-light" type="button" id="button-addon2">Generate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null ;
    }
}