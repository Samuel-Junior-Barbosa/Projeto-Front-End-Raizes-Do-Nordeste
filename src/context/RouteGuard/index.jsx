import React, { use, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";



const RouteGuard = () => {
 
    const user = JSON.parse( sessionStorage.getItem('currentAccount'))
    useEffect(() => {
        //console.log("CURRENT USER: ", user)
    }, [])

    if( !user ) {
        return <Navigate to="/login" />;
    }

    else if( user && !user.name ) {
        return <Navigate to="/login" />;
    }
    
    return (
        <Outlet />
    )
};

export default RouteGuard;