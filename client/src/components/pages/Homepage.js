
import React, { useEffect, useState } from 'react';
import { GetUser } from '../../Database';
import CreateSubjectForm from './pagecomponents/CreateSubjectForm';
import Dashboard from './pagecomponents/Dashboard';

import SubjectCard from './pagecomponents/SubjectCard';

function Homepage() {
    const [load, setLoad] = useState(false);
    const [update,setupdate] = useState(false);
    const [userInfo, setUserInfo] = useState({
        usertype:"null"
    });
    const [userSubjects,setsubjects] = useState([{}]);

    useEffect(()=>{
        setLoad(false);
            GetUser().then((res)=>{
                if(res.usertype==null){
                    window.location = "/";
                }
            setUserInfo(res);
            setsubjects(res.subjects);
        }).then(()=>{
            setLoad(true);
        });
        
    },[update]);
   
    return (
        <div>
            <Dashboard load={load} setupdate={setupdate} loadsubject={false}/>
            <div className="subcontainer">
               {load &&  <div>
                    {userSubjects.map((subject)=>{
                        return (
                            <SubjectCard name={subject.name} teacher={subject.teacher} code={subject.code} id={subject._id}/>
                        )
                    })}
                </div>}
            </div>
            {userInfo.usertype==="teacher" && <CreateSubjectForm setupdate={setupdate} update={update}/>}
            
        </div>
    )
}

export default Homepage
