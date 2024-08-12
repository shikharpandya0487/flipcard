import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const usercontext = createContext();

const UserProvider=({ children }) =>{

  const [user,setUser]=useState()
  const navigate=useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);
     console.log(userInfo)
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  

  return (
    <usercontext.Provider value={{user,setUser}}>
      {children}
    </usercontext.Provider>
  );
}

export const Userstate=()=>{
  return useContext(usercontext)
}
export default UserProvider
