import React, { useEffect, useState } from 'react'
import Dashboard from './pagecomponents/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { GetAsubject } from '../../Database';

function People(props) {
    const subjectId = props.match.params.subjectId;
    const [load, setLoad] = useState(false);
    const [teacher,setTeacher] = useState("");
    const [user,setuser] = useState([]);
    
    useEffect(() => {
        GetAsubject({subjectId:subjectId}).then((res)=>{setTeacher(res.teacher);setuser(res.user)}).then(()=>setLoad(true));
    }, []);

    function Teachers() {
        return (
            <div className="assignbox">
                <h3>Teachers </h3>
                <hr />
                <ul>
                    <li><AccountCircleIcon/> {teacher}</li>
                    {user.map((user)=>{
                        if(user.usertype==="teacher"){
                            return <li><AccountCircleIcon/> {user.name}</li>
                        }else{
                            return 
                        }
                        
                    })}

                </ul>
            </div>
        )
    }


    function Students() {
        return (
            <div className="assignbox">
                <h3>Students</h3>
                <hr />
                <ul>
                    {user.map((user)=>{
                        if(user.usertype==="student"){
                            return <li><AccountCircleIcon/> {user.name}</li>
                        }else{
                            return 
                        }
                        
                    })}
                    
                </ul>
            </div>
        )
    }


    return (
        <div className="assignpage">
            <Dashboard load={load} loadsubject={true} subjectId={subjectId} />

            <div className="assigncont">
                {load &&
                    <>
                        <Teachers />
                        <Students />
                    </>
                }
            </div>
        </div>
    )
}

export default People
