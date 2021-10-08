import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { GetUser, JoinSubject, Logout } from '../../../Database';
import LinearIndeterminate from "./Loader";
import { Button,FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import LeftDrawer from './Drawer';


function Dashboard(props) {
    const [openProfile, setOpenProfile] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [openDrawer, setDrawer] = useState(false);
    const history = useHistory();

    // This is for Modal for JoinClass Component
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleLogout() {
        Logout().then((res)=>{window.location="/"});
    }
    useEffect(() => {
        GetUser().then((res) => {
            setUserInfo(res);
        });
    }, []);

    function Profile() {
        return (
            <div className="profilecont" onMouseLeave={() => setOpenProfile(false)}  >
                <AccountCircleIcon style={{ position: "relative", float: "center", fontSize: "400%" }} />
                <br />
                {userInfo.name}
                <br />
                {userInfo.username}
                <hr />
                <h5 style={{ cursor: "pointer" }} onClick={() => { window.confirm("Logout ?") && handleLogout() }}>Logout</h5>
            </div>
        )
    }

    function JoinClass() {
        const [subjectCode, setCode] = useState("");
        function handleSubmit(){
            JoinSubject({userId:userInfo._id ,subjectCode:subjectCode}).then((res)=>{window.alert(res); props.setupdate();});
            handleClose();
        }


        return (
            <>  
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Join a Class</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={()=>{handleSubmit()}}>
                    <Modal.Body>


                        <>
                            <Row className="g-2">
                                Ask your teacher to share the code and enter it here.
                            </Row>
                            <Row className="g-2 mt-2">
                                <FloatingLabel controlId="floatingInputGrid" label="Subject Code">
                                    <Form.Control type="text" placeholder="CSE4523" value={subjectCode} onChange={(e) => { setCode(e.target.value) }} required={true} />
                                </FloatingLabel>
                            </Row>
                        </>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
    }


    function DashLinks() {
        return (
            <div className="dashlink">
                <ul>
                    <Link to="/home"><li>Home</li></Link>
                    <Link to={`/subject/${props.subjectId}`}><li>Stream</li></Link>
                    <Link to={`/people/${props.subjectId}`}><li>People</li></Link>
                </ul>
            </div>
        )
    }
    return (
        <div>
            <JoinClass />
            {/* {openDrawer && <LeftDrawer setDrawer={setDrawer} />} */}
            <div className="dashboard">
                <h3 className="logo">
                    <MenuIcon className="drawerIcon" onClick={()=>{setDrawer(!openDrawer)}} />
                    My Classroom
                </h3>
                <h3> 
                <AccountCircleIcon className="rightIcon" style={{ fontSize: "130%" }} onClick={() => { setOpenProfile(!openProfile) }} /> 
                <AddIcon  className="rightIcon" style={{ fontSize: "130%" }}  onClick={handleShow}/>
                 </h3>
                 {props.loadsubject && <DashLinks />}
                 {!props.load && <LinearIndeterminate />}
            </div>
            {openProfile && <Profile />}
        </div>
    )
}

export default Dashboard;
