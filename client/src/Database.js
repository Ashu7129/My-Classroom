
import axios from "axios";
import { Redirect } from "react-router";

//User API's
export async function GetUser(){
    let response=null;
    await axios.get("/api/user/getuser").then((res)=>{response=res});
    return response.data;
}

export async function Googleauth(){
    return     
}

export async function Loginuser(props) {
    let response = null;
    await axios({
        method: "post",
        url: "/api/user/login",
        data: props
      }).then((res)=>{response=res.data});
    return response;
}

export async function Registeruser(props){
    const response =   await axios({
        method:"post",
        url:"/api/user/register",
        data: props
    });
    return response.data;
}

export async function Logout(){
    let response = null;
    await axios.get("/api/user/logout").then((res)=>{
        response = res.data;
    });
    return response;
}


//Subjects API's

export async function Addsubject(subject) {
    let response = null;
    await axios({
        method:"post",
        url:"/api/subject/addSubject",
        data:subject
    }).then((res)=>{response=res.data});
    return response;
}

export async function GetAsubject(subject) {
    let response =  null;
    await axios({
        method:"post",
        url:"/api/subject/getasubject",
        data:subject
    }).then((res)=>{response = res.data});

    return response;
}

export async function Addpost(props){
    let response = null;
    await axios({
        method:"post",
        url:"/api/subject/addpost",
        data:{
            subjectId:props.subjectId,
            description:props.description
        }
   }).then((res)=>{response = res.data});
    return response;
}

export async function JoinSubject(user){
    let response="null";
    await axios({
        method:"post",
        url:"/api/subject/joinsubject",
        data:{user}
    }).then((res)=>{response = res.data});
    return response;

}