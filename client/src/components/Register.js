import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { Registeruser } from '../Database';

function Register(props) {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setmsg] = useState("");
    const [msgcolor, setmsgcolor] = useState("green");
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault();
        const { message, user } = await Registeruser({
            name: fname + " " + lname,
            username: email,
            password: password,
            usertype: props.usertype
        });
        if (user !== null) {
            setmsgcolor("green");
            setTimeout(() => {
                history.push("/home");
            }, 1000);
        } else {
            setmsgcolor("red");
        }
        setmsg(message);

    }

    return (
        <div>
            <div className="form">
                <p style={{ color: msgcolor }}>{msg}</p>
                <h3 style={{ textAlign: "center" }}>Register</h3>
                <br />
                <Form onSubmit={(e) => { handleSubmit(e) }}>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First name" onChange={(e) => { setfname(e.target.value) }} required value={fname} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last name" onChange={(e) => { setlname(e.target.value) }} value={lname} required />
                        </Col>
                    </Row>
                    <br />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" id="loginbtn" className="col-3">
                        Submit
                    </Button>
                    <Button variant="danger" type="submit" id="googlebtn" className="col-8 ms-4" >
                        Sign in with Google
                    </Button>
                    <br />
                    <br />  
                    <Link to={"/" + props.usertype + "/login"} style={{ position: "relative", float: "left" }} >Login </Link>
                    <Link to="/" style={{ position: "relative", float: "right" }}> Switch </Link>
                </Form>

            </div>
        </div>
    )
}

export default Register
