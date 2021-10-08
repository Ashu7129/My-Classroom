import React from 'react';
import { useHistory } from 'react-router-dom';

function SubjectCard(subject) {
    const history = useHistory();
    return (
        <div className="subcard" onClick={()=>{history.push(`/subject/${subject.id}`)}}>
            <h2 className="subname">
                {subject.name}
            </h2>
            <br /><br /><br /><br/>
            <p>Teacher : {subject.teacher}</p>
            <p>Code : {subject.code}</p>
        </div>
    )
}

export default SubjectCard;
