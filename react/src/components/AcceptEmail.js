import {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import './../static/css/AcceptEmail.css';



const AcceptEmail = ()=>{
    const [second, setSecond] = useState(5);
    const history = useHistory();

    useEffect(()=>{
        var location = window.location.href
        location = location.split("/")
        let uuid = location.slice(-1)

        axios.patch(`http://127.0.0.1:8000/email/send/${uuid}/`)
        .then(result=>{
            console.log(result)
            setInterval(()=> {
                setSecond(second=> second - 1)
            }, 1000);
        })

    }, [])

    useEffect(()=>{
        if(second == 0){
            history.push("/home")
        }
    }, [second])

    return(
        <div className = "container-verify">
            <div className = "verify-text">your account has been <span style = {{color : "green"}}>verified</span></div>

            <div className= "taken">You will be taken to the Home page after <span style = {{color : "#DA0037"}}>{second}</span> second</div>
        </div>
    )
}

export default AcceptEmail;
