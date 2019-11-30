import React from "react";
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopy';
import { copyText } from '../../../../../utils';
import Option from "./option";

export default function Question (props) {
    const handleCopy = question => {
        copyText(JSON.stringify(question));
        alert('Index has been copied');
    };

    return(
        <div>
            <h3>{props.question.name}</h3>
            <ul>
                {props.question.options.map((option, i) =>
                    <Option key={i} text={option.text} smile={option.smile}/>
                )}
                <Button variant={"text"} color={"secondary"} onClick={() => props.delete(props.index)}><DeleteIcon/></Button>
                <Button variant={"text"} color={"default"} onClick={() => handleCopy(props.question)}><FileCopy/></Button>
            </ul>
        </div>

    );
}