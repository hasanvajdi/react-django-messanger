import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';


const UserCheck = (props)=>{
    const history = useHistory();
    const cookies = new Cookies();


    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/rest/user/",{
            headers: {
                    "Authorization": 'Bearer ' + cookies.get("access"),
                }
        })
        .then(result=>{
            props.setUser(result.data)
        })
        .catch(error=>{
            var refresh = JSON.stringify({"refresh" : `${cookies.get("refresh")}`})
            axios.post("http://localhost:8000/rest/token/refresh/", refresh, {
                headers : {
                    "Content-Type" : "application/json",
                }
            })
            .then(refresh_res=>{
                cookies.set("access", `${refresh_res.data.access}`, { path: '/' })
                axios.get("http://localhost:8000/rest/user/",{
                    headers: {
                            "Authorization": 'Bearer ' + cookies.get("access"),
                        }
                })
                .then(result=>{
                    props.setUser(result.data)
                })
            })
            .catch(err=>{
                history.push("/login")
            })
        })
    }, [])


    return(
        null
    )
}


export default UserCheck;
