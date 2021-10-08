import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { GetUser } from '../Database';

function LandingPage(props) {
    const history = useHistory();
    const [load, setload] = useState(false);
    useEffect(() => {
        GetUser().then((res)=>{
            if(res.usertype!=null){
                window.location = "/home";
            }else{
                setload(true);
            }
        });
    }, []);

    function Selectusertype() {
        return (
            <div className="landingpage">
                <Router>
                    <Link to="/student/login" className="student tab" onClick={() => {
                        props.setUsertype("student");
                        history.push("/student/login")
                    }}>Student</Link>
                    <Link to="/teacher/login" className="teacher tab" onClick={() => {
                        props.setUsertype("teacher");
                        history.push("/teacher/login")
                    }}>Teacher</Link>
                </Router>
            </div>

        )
    }

    return (
        load && <Selectusertype />
    )    
}

export default LandingPage