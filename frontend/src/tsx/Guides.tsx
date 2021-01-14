import React from "react";
  
export class Guides extends React.Component<any,any> {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12 mt-3">
                        <div className="mb-3">
                            <div className="alert alert-danger" role="alert">
                                <h3>Attention</h3>
                                <p>Never use this chat if there is no HTTPS connection icon on the tab. Your communication could be compromised.</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3>Short description</h3>
                            <p><small>Our server does not record user data, as well as message history. The server does not use the database, sessions and proxy cache. But your messages can be saved or processed by the provider or hosting middleware. The salt of your hash is used as the name of the room. Nobody knows the salt for decoding, so that you can communicate with your interlocutor, tell him the salt in advance. In any secure way. This chat allows you to exchange instant messages, by prior agreement on the terms of communication.</small></p>
                        </div>
                        <div className="mb-3">
                            <h3>VPN</h3>
                            <p><small>Before starting communication on private topics, it is recommended to connect a private vpn.</small></p>
                        </div>
                        <div className="mb-3">
                            <h3>Encrypt method RSA</h3>
                            <p><small>Two keys, private and public.</small></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}