import React from "react";

export default function Option(props) {
    return (
        <li>
            <b>{props.smile}</b> :
            <i>{props.text}</i>
        </li>

    );
}