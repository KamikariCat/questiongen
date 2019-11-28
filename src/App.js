import React, {useState} from 'react';

import * as R from 'ramda';

import Picker from 'emoji-picker-react';

import { Icon } from 'react-icons-kit';
import {ic_control_point} from 'react-icons-kit/md/ic_control_point'
import {ic_close} from 'react-icons-kit/md/ic_close'
import {
    Container,
    Row,
    Col,
    Button,
    FormControl,
    FormLabel,
} from 'react-bootstrap';

function App() {

    const [questionName, setQuestionName] = useState('');
    const [smile, setSmile] = useState('');
    const [option, setOption] = useState('');
    const [generated, setGeneratedTest] = useState('');

    const [options, setOptions] = useState([]);


    const addOption = () => {
        if (!smile.length || !questionName.length || !option.length) return;
        setOptions(options.concat([{smile, text: option}]));

        setOption('');
        setSmile('');
    };
    const removeOption = function (index) {
        setOptions(R.remove(index, 1, options))
    };

    const generateText = function () {
        if (!questionName.length || !options.length) return;

        const questionObject = {
            question: questionName,
            options
        };
        setGeneratedTest(JSON.stringify(questionObject));
    };

    const clearForm = function () {
        setQuestionName('');
        setSmile('');
        setOption('');
        setGeneratedTest('');
        setOptions([]);
    }

    const copyGenerated = function () {
        if (!generated.length) return;
        const INPUTFORCOPY = document.createElement("INPUT");
        INPUTFORCOPY.type = "text";
        INPUTFORCOPY.value = generated;
        INPUTFORCOPY.style.position = 'absolute';
        INPUTFORCOPY.style.left = '-99999px';
        INPUTFORCOPY.style.opacity = '0';
        document.body.appendChild(INPUTFORCOPY);
        INPUTFORCOPY.select();
        document.execCommand('copy');
        INPUTFORCOPY.remove();
    }

  return (
      <Container>
          <Row>
              <h2>Questions generator</h2>
          </Row>
          <Row>
              <Col>
                  <FormLabel>
                      <FormControl type={"text"} placeholder={"Question name"} value={questionName} onChange={e => setQuestionName(e.target.value)}/>
                  </FormLabel>
                  <Row>
                      {/*<Col><FormControl type={"text"} placeholder={"smile"} value={smile} onChange={e => setSmile(e.target.value)}/></Col>*/}
                      {smile.length ? <Col md={"auto"}>{smile}</Col> : null}
                      <Col md={"auto"}><FormControl type={"text"} placeholder={"option"} value={option} onChange={e => setOption(e.target.value)}/></Col>
                      <Col md={"auto"}><Button variant={"success"} onClick={addOption}><Icon icon={ic_control_point}/> Add</Button></Col>

                  </Row><br/>
                  <Row style={{marginBottom: '15px'}}>
                      <Picker onEmojiClick={(e, obj) => setSmile(obj.emoji)}/>
                  </Row>
                  <Row>
                      <Button onClick={generateText} style={{marginRight: '15px'}}>Generate text</Button>
                      <Button variant="outline-danger" onClick={clearForm}>Clear form</Button>
                  </Row>
              </Col>
              <Col>
                  <p><b>{questionName}</b></p>
                  <p>
                      {options.map((option, index) => {
                          return(
                              <Row>
                                  <Col>
                                      <b>{option.smile}</b>
                                  </Col>
                                  <Col>
                                      {option.text}
                                  </Col>
                                  <Col>
                                      <Button variant={"danger"} onClick={() => removeOption(index)}><Icon icon={ic_close}/> </Button>
                                  </Col><br/>
                              </Row>
                          );
                      })}
                  </p>
                  {generated.length && options.length ? <p>
                      <p><small>{generated}</small></p>
                      <Button variant="dark" onClick={copyGenerated}>Copy text</Button>
                  </p> : null}
              </Col>
          </Row>
      </Container>
  );
}

export default App;
