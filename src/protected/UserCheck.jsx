import { useState,useEffect} from "react";
import axios from "axios";
import { AuthContext } from "/src/auth/AuthContext.jsx";


function UserCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState('');

    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/auth/user`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
};

useEffect(() => {
    axios(config)
    .then((response) => {
        setMsg(response.data.message);
    })
    .catch((error) => {
        console.error("Error al obtener el usuario:", error);
        setMsg(error.message);
    });
}
, [])

return (
    <div>
        <h1>{msg}</h1>
    </div>
);
}
