import React, {Component} from "react";
import {
    Container,
    Grid
} from "@material-ui/core";

import Creation from "./components/creation";
import View from "./components/view";
import {remove} from "ramda";

const ContainerStyle = {
    backgroundColor: 'rgba(0,0,0,.1)',
    marginBottom: '15px'
};

export default class QuestionGenerator extends Component {
    constructor(props) {
        super(props);

        const questionData = JSON.parse(localStorage.getItem('questionGenerator'));

        this.state = {
            questions: questionData || []
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem('questionGenerator', JSON.stringify(nextState.questions));
        return true;
    }

    createQuestion (question) {
        if (!question)
            return alert('fuck it all');

        this.setState(prev => {
            return prev.questions.push(question);
        });
    };

    deleteQuestion (index) {
        this.setState(prev => {
            prev.questions = remove(index, 1, prev.questions);
            return prev;
        });
    };

    render() {
        return(
            <Container style={ContainerStyle}>
                <h1>Question generator</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6} md={8} sm={10}>
                        <Creation create={this.createQuestion.bind(this)}/>
                    </Grid>
                    <Grid item xs={12} lg={6} md={12} sm={12}>
                        <View
                            delete={this.deleteQuestion.bind(this)}
                            questions={this.state.questions}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}