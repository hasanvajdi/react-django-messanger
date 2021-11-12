import {useEffect} from 'react';
import axios from 'axios';

const AcceptEmail = ()=>{
    useEffect(()=>{
        var location = window.location.href
        location = location.split("/")
        let uuid = location.slice(-1)

        axios.patch(`http://127.0.0.1:8000/email/send/${uuid}/`)
        .then(result=>{
            console.log(result)
        })

    })

    return(
        <p>thi page is AcceptEmail</p>
    )
}

export default AcceptEmail;
