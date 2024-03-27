import React, { useContext } from "react";
import "./AccountPage.css";
import { UserContext } from "../UserContext/UserContext";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
    const {ready,user}=useContext(UserContext);

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user){
        return <Navigate to={'/login'}/>
    }
  return <div>AccountPage for  user: {(user.USER_NAME)}</div>;
};

export default AccountPage;
