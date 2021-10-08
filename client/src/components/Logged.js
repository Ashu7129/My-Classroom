import React from 'react';
import {Route} from 'react-router-dom';
import { GetUser } from '../Database';
import AssignmentPage from './pages/AssignmentPage';
import Homepage from './pages/Homepage';
import SubjectPage from './pages/SubjectPage';
import TestPage from './pages/TestPage';



function Logged(props) {
    const response = GetUser();

    if(response.usertype!=null){
        return (
            <>
                    <Route path="/logged/home"><Homepage  /></Route>
                    <Route path="/logged/sub"><SubjectPage /></Route>
                    <Route path="/logged/assignments"><AssignmentPage /></Route>
                    <Route path="/logged/tests"><TestPage /></Route>
            </>
        )
         
    }else{
        window.location = "/pagenotfound";
        return <>

        </>
    }

    
}

export default Logged