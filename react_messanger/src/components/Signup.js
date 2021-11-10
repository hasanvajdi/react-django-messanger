import React, {useState} from 'react';
import './../static/css/signup.css'
import Messanger from './../static/image/messanger.png'
import { BsGithub, BsLinkedin, BsInstagram,
        BsTelegram, BsFillKeyFill } from "react-icons/bs";
import {Link, useHistory } from 'react-router-dom'
import {Form, FormGroup, Label, Input,Container, Row, Col, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';



const Login = (props)=>{
    const cookies = new Cookies();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const history = useHistory();

    const submitSignup = (e)=>{
        e.preventDefault();
        var data = {"username" : `${username}`, "password1" : `${password}`, "password2" : `${rePassword}`}
        data = JSON.stringify(data)
        console.log(data)
        axios.post("http://127.0.0.1:8000/rest/signup/", data, {
            headers : {
                "Content-Type" : "application/json",
            }
        })

        .then(res=>{
            cookies.set("access", `${res.data.access_token}`, { path: '/' })
            cookies.set("refresh", `${res.data.refresh_token}`, { path: '/' })

            history.push("/AcceptAccount")
        })
    }


    return(
        <Container className = "login-container">
            <Row style = {{height : "100%"}}>
                <Col className = "right-side" xs = "12" sm = "12" md = "4" lg = "4">
                    <img src = {Messanger} alt = "messanger icon" className = "messanger-pic"/>
                    <div className = "messanger-cover">
                        <h2 className = "signup-text">Signup</h2>

                        <div className = "social-icons">
                            <a href = "https://github.com/hasanvajdi"><BsGithub className = "icon" /></a>
                            <a href = "https://www.linkedin.com/in/hasan-vajdi-34a860225/"><BsLinkedin className = "icon" /></a>
                            <a href = "https://t.me/hasan_zltn9"><BsTelegram className = "icon" /></a>
                            <a href = "https://www.instagram.com/hasan__vajdi/"><BsInstagram className = "icon" /></a>
                        </div>
                    </div>
                </Col>

                <Col className = "form-container" xs = "12" sm = "12" md = "8" lg = "8">
                    <Row className = "form-row">
                        <Col xs = "10" md = "10" lg = "10" className = "login-col">
                            <Form onSubmit = {submitSignup}>
                                <FormGroup className = "signup-formgroup">
                                    <Label className = "login-label" for = "username">Username</Label>
                                    <Input
                                        name = "username"
                                        id = "username"
                                        type = "text"
                                        placeholder = "Only letters adn underline are allowed"
                                        className = "input username-input"
                                        onChange = {(ev)=>{setUsername(ev.target.value)}}
                                    />
                                </FormGroup>

                                <FormGroup className = "signup-formgroup">
                                    <Label className = "login-label" for = "password">Password</Label>
                                    <Input
                                        name = "password"
                                        id = "password"
                                        type = "password"
                                        placeholder = "write strong password"
                                        className = "input username-input"
                                        onChange = {(ev)=>{setPassword(ev.target.value)}}

                                    />
                                </FormGroup>

                                <FormGroup className = "signup-formgroup">
                                    <Label className = "login-label" for = "re_password">Password</Label>
                                    <Input
                                        name = "re_password"
                                        id = "re_password"
                                        type = "password"
                                        placeholder = "write again the above password"
                                        className = "input username-input"
                                        onChange = {(ev)=>{setRePassword(ev.target.value)}}

                                    />
                                </FormGroup>

                                <Row >
                                    <Col xs = "5" sm = "4" md = "4" lg = "4">
                                        <FormGroup  className = "" style = {{wordSpacing: "5px"}}>
                                            <Input
                                                name = "rememberme"
                                                type = "checkbox"

                                            />
                                        <Label className = "remember-name">remember me</Label>
                                        </FormGroup>
                                    </Col>

                                    <Col xs = "7" sm = "8" md = "8" lg = "8" className = "forgot-password">
                                        <Link><span style = {{float : "right", color : "#171717"}}>I forgot my password</span></Link>
                                        <BsFillKeyFill style = {{float : "right",  marginRight : "5px", marginTop : "5px"}}/>
                                    </Col>
                                </Row>

                                <Row style = {{paddingBottom : "30px"}}>
                                    <Col xs = "3" sm = "2" md = "2" lg = "2" ><Button className = "login-submit-form">Submit</Button></Col>
                                    <Col xs = "8" sm = "9" md = "9" lg = "9" className = "or-signup" style = {{display : "flex", justifyContent : "flex-start", marginLeft : "20px"}}>
                                        <div className = "or-signup-text">or <Link to = "/login" style = {{textDecoration : "none"}}><span style = {{marginLeft : "5px", color : "#DA0037"}}>Login</span></Link></div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
