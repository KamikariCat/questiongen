import React from "react";
import {Container} from "@material-ui/core";

import Question from "./question/";

export default function View (props) {
    return(
        <Container>
            <h2>Вопросы:</h2>
            {props.questions.map((question, index) =>
                <Question question={question} index={index} key={index} delete={props.delete}/>
                )}
        </Container>
    );
}