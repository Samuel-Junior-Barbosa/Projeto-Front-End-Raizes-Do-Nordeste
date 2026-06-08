import React, { use, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";



const RouteGuard = ({administratorRoute = false}) => {
 
    const user = JSON.parse( sessionStorage.getItem('currentAccount'))
    useEffect(() => {
        //console.log("CURRENT USER: ", user, user.administrator, administratorRoute, administratorRoute === true && user.administrator === false)
    }, [])

    if( !user ) {
        return <Navigate to="/login" />;
    }

    else if( administratorRoute === true && user.administrator === false ) {
        //console.log("administratorRoute: ", user)
        return <Navigate to="/not-permission" />;
    }

    else if( user && !user.name ) {
        return <Navigate to="/login" />;
    }
    
    return (
        <Outlet />
    )
};

export default RouteGuard;