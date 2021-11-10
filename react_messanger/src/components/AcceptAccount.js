import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, FormGroup, Label, Input,Container, Row, Col, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './../static/css/AcceptAccount.css';


const AcceptAccount = (props)=>{
    const [email, setEmail] = useState();
    const history = useHistory();
    console.log("props user : ", props.user)
    const submitEmail = (e)=>{
        e.preventDefault()
        console.log(email)
    }



    return(
        <Container className = "accept-container">
            <Row>
                <Col xs = "8" sm = "8" md = "5" lg = "4"  className = "email-form-container">
                    <Row>
                        <Col xs = "10" sm = "12" md = "12" lg = "12" className = "email-text-container">
                            <h2 className = "email-text">Email confirmation</h2>
                        </Col>

                        <Col xs = "10" sm = "10" md = "10" lg = "10" className = "form-col" style = {{marginLeft :"auto", marginRight : "auto"}}>
                            <Form onSubmit = {submitEmail}>
                                <FormGroup >
                                    <Input
                                        className = "email-input"
                                        placeholder = "Enter your email"
                                        bsSize = "sm"
                                        onChange = {(email)=>setEmail(email.target.value)}
                                    />
                                </FormGroup>

                                <Button className = "receiv-email" size = "sm" block>recieve email</Button>
                            </Form>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </Container>
    )
}

export default AcceptAccount;
