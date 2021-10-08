import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { Addsubject } from '../../../Database';


function CreateSubjectForm(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ButtonStyle = {
        width: "55px",
        height: "55px",
        backgroundColor: "#D9534F",
        color: "white",
        cursor: "pointer",
        padding: "10px",
        position: 'fixed',
        float: 'right',
        right: '5%',
        bottom: "5%",
        fontSize: "200%",
        borderRadius: "50%"
    }

    function SubjectModal() {
        const [name, setname] = useState("");
        const [code, setCode] = useState("");
        const [teacher, setTeacher] = useState("");
        const [description, setDesc] = useState("");
    
        function handleSubmit() {
            Addsubject({
                name: name,
                description: description,
                teacher: teacher,
                code: code
            }).then((res) => { window.alert(res); props.setupdate(!props.update); });
            handleClose();
            
        }
    



        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Subject</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                    <>
                <Row className="g-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid1" label="Subject">
                            <Form.Control type="text" placeholder="Subject title"  value={name} onChange={(e)=>{setname(e.target.value)}} key="1"/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid2" label="Subject Code">
                            <Form.Control type="text" placeholder="CSE14D32" value={code} onChange={(e)=>{setCode(e.target.value)}} key="2"  />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="g-2 mt-2">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid3" label="Teacher">
                            <Form.Control type="text" placeholder="Tom" value={teacher} onChange={(e)=>{setTeacher(e.target.value)}} key="3" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid4" label="Description">
                            <Form.Control type="text" placeholder="Description" value={description} onChange={(e)=>{setDesc(e.target.value)}} key="4" />
                        </FloatingLabel>
                    </Col>
                </Row>
            </>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{handleSubmit()}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    return (
        <div>
            <AddIcon style={ButtonStyle} onClick={handleShow} />
            <SubjectModal />

        </div>
    )
}

export default CreateSubjectForm
