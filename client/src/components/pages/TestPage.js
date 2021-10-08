import React, { useEffect, useState } from 'react'
import Dashboard from './pagecomponents/Dashboard';
import { Link } from "react-router-dom";

function TestPage() {
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 1000);
    }, []);


    function UpcomingTests() {
        return (
            <div className="testbox">
                <h3>Upcoming Tests</h3>
                <hr />
                <ul>
                    <li><Link to="">Quiz 4 on 14/09/2021</Link></li>
                    <li><Link to="">Quiz 5 on 14/09/2021</Link></li>
                    <li><Link to="">Quiz 6 on 14/09/2021</Link></li>
                    <li><Link to="">Quiz 7 on 14/09/2021</Link></li>
                </ul>

            </div>
        )
    }

    function Passed() {
        return (
            <div className="testbox">
                <h3>Completed Tests</h3>
                <hr />
                <ul>
                    <li><Link to="">Quiz 1 on 14/08/2021</Link></li>
                    <li><Link to="">Quiz 2 on 14/08/2021</Link></li>
                    <li><Link to="">Quiz 3 on 14/08/2021</Link></li>
                    <li><Link to="">Quiz 4 on 14/08/2021</Link></li>
                </ul>

            </div>
        )
    }



    return (
        <div>
            <Dashboard load={load} />
            <div className="testcont">
                {load &&
                    <>
                        <UpcomingTests />
                        <Passed />
                    </>
                }
            </div>

        </div>
    )
}

export default TestPage
