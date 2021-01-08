import * as React from "react";
import { useStore } from "effector-react";
import { MessageList } from "../mvvm/Model/stateEffector";

export const ChatHistory: React.FC = () => {
    const messages = useStore(MessageList);
    return (
        <React.Fragment>
            { messages.map( (message: any, index: number) => (
                <div className="card-body" key={ index } >
                    <p>{ message.author }</p>
                    <p>{ message.message }</p>
                </div>
                ))
            }
      </React.Fragment>
    )
}