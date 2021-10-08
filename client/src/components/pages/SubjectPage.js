import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Addpost, GetAsubject } from '../../Database';
import Dashboard from './pagecomponents/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';


function SubjectPage(props) {
    const [load, setLoad] = useState(false);
    const subjectId = props.match.params.subjectId;
    const [subjectInfo, setSubInfo] = useState({});
    const [update,setupdate] = useState(false);
    const [posts,setposts] = useState([]);
    

    useEffect(()=>{
        GetAsubject({subjectId:subjectId}).then((res)=>{
            if(res!=null||undefined){
                setSubInfo(res);
                setposts(res.posts.reverse());
                setLoad(true);
            }else{
                window.alert("Can't load Subject");
                window.location = "/home";  
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update]);

    function Post(props){
        function linkify(inputText) {
            var replacedText, replacePattern1, replacePattern2, replacePattern3;
        
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, `<a href="$1" target="_blank">$1</a>`);

            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, `$1<a href="http://$2" target="_blank">$2</a>`);
        
            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, `<a href="mailto:$1">$1</a>`);

            const __html = replacedText;
        
            return <div dangerouslySetInnerHTML={{ __html }} />;
        }
        
        

        return (
            <div className="post">
                <h3><AccountCircle style={{fontSize:"150%",color:"grey"}}/> {props.author}</h3>
                <hr />
                <p id="comment">{linkify(props.description)}</p>
            </div>
        )
    }

    function CreatePost(){
        const [post,setPost] = useState("");
        return (
            <div className="createpost">
                <textarea value={post} rows="1" onChange={(e)=>{setPost(e.target.value)}} placeholder="Announce something to class"></textarea>
                <Button variant="primary" id="postbtn" className="col-3" type="submit" onClick={()=>{
                    Addpost({subjectId:subjectId,description:post}).then((res)=>{
                        setupdate(!update)
                        }) 
                    }} > Post</Button>
            </div>
        )
    }
    
    function Notification() {
        return (
            <div>
                <h3>Upcoming</h3>
                <hr />
                <p>Test on 14/09/2021</p>
            </div>
        )
    }

    return (
        <div>
        <Dashboard load={load} loadsubject= {true} subjectId={subjectId} />
            <div className="subpage">
            {load && <>
                <div className="subtitle">
                <h1>{subjectInfo.name}</h1>
                <p>Description : {subjectInfo.description}</p>
                <p>Subject Code : {subjectInfo.code}</p>
            </div>
            {/* <div className="notifications">
                    <Notification />
            </div> */}
            <div>
                <CreatePost />
            </div>  
            <div className="postcontainer">
                {posts.map((post)=>{
                    return <Post author={post.author} description={post.description} />
                })}
            </div>
            </>
            }
        </div>
        </div>
        
    )
}

export default SubjectPage
