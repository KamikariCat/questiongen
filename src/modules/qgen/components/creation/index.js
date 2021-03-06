import React, {useState} from "react";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {
    Container,
    TextField,
    Button
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import * as R from "ramda";

export default function Creation (props) {
    const [question, setQuestion] = useState('');
    const [smile, setSmile] = useState('');
    const [option, setOption] = useState('');

    const [options, setOptions] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);

    const addOption = (smile, text) => setOptions(options.concat([{ smile, text }]));
    const removeOption = index => setOptions(R.remove(index, 1, options));
    const clearOptionInputs = () => {
        setSmile('');
        setOption('');
    };

    const clearAll = () => {
        clearOptionInputs();
        setQuestion('');
        setOptions([]);
    };

    const isOptionReadyToAdd = smile.length && option.length;
    const isQuestionReadyToCreate = options.length && question.length;

    const handleAddOption = (smile, text) => {
        if (!isOptionReadyToAdd) return (alert("Нельзя добвыить вариант"));

        addOption(smile, text); clearOptionInputs();
    };

    const createQuestion = () => {
        if (!isQuestionReadyToCreate)
            return alert("Вопрос не готов к созданию");

        props.create({name: question, options});
        clearAll();
    };

    const setEmogi = emoji => {
        setSmile(emoji);
        setShowEmoji(false);
    };

    return(
        <Container>
            <TextField
                required
                id="outlined-required"
                label="Текст вопроса"
                margin="normal"
                variant="outlined"
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />

            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                {showEmoji ? <Picker onSelect={emoji => setEmogi(emoji.native)}/> :
                    <TextField
                        required
                        id="outlined-required"
                        label="Emoji"
                        margin={"normal"}
                        variant="outlined"
                        value={smile}
                        onFocus={() => setShowEmoji(true)}
                        onChange={e => setSmile(e.target.value)}
                    />}
                <TextField
                    required
                    id="outlined-required"
                    label="Текст варианта"
                    margin={"normal"}
                    variant="outlined"
                    value={option}
                    onChange={e => setOption(e.target.value)}
                />
                <Button variant={"text"} size={"small"} onClick={() => handleAddOption(smile, option)}><AddIcon/></Button>
            </div>

            <br/>

            {options.map((o, i) => {
                return (
                    <p key={i}>
                        <b>{o.smile}</b>
                        <i>{o.text}</i>
                        <Button variant={"text"} onClick={() => removeOption(i)} color={"secondary"}><DeleteIcon/></Button>
                    </p>
                );
            })}
            <Button variant={"contained"} color={"primary"} onClick={createQuestion}>Создать вопрос</Button>
        </Container>
    );
}