import React, { useState } from 'react';
import {Form, Button} from "react-bootstrap";
import { useHistory,Link } from 'react-router-dom';
import { Loginuser } from '../Database';
import {Googleauth} from "../Database";
import { Redirect } from 'react-router';
function Login(props) {
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [msgcolor,setmsgcolor]  = useState("red");

    async function handleSubmit(e){
        e.preventDefault();
        const {message, user} = await Loginuser({
            username:email,
            password:password
        });
        
        if(user!=null){
            setTimeout(()=>{history.push("/home")},1200);
            setmsgcolor("green");
        }
        setMessage(message);
    }

    return (
        <div className="form">
        <p style={{color: msgcolor }}>{message}</p>
        <h3 style={{textAlign:"center"}}>Login</h3>
            <Form onSubmit={(e)=>{handleSubmit(e)}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required={true} type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value); setMessage("")}} value={email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value); setMessage("")}} value={password} required={true} />
                </Form.Group>
                <Button variant="primary" type="submit" id="loginbtn" className="col-3" >
                    Submit
                </Button>
                <Button variant="danger"  id="googlebtn" className="col-8 ms-4" >
                    Sign in with Google
                </Button>
                <br />
                <br />
                <Link to= {"/"+props.usertype+"/register"} style={{position:"relative",float:"left"}} >New {props.usertype} ?</Link>
                <Link to="/" style={{position:"relative",float:"right"}}> Switch</Link>
                
            </Form>
        </div>
    )
}

export default Login
