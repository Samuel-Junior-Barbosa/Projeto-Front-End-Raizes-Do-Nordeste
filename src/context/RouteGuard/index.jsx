import React, { use, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";



const RouteGuard = ({
        administratorRoute = false,
        attendantRoute = false
    }) => {
 
    const user = JSON.parse( sessionStorage.getItem('currentAccount'))
    useEffect(() => {
        console.log(" PARAMS: administratorRoute, attendantRoute ", administratorRoute, attendantRoute)
        console.log("CURRENT USER: ", user )
        console.log(" PERMISSIONS: ", user.administrator, user.attendant, administratorRoute, administratorRoute === true && user.administrator === false)
    }, [])

    if( !user ) {
        return <Navigate to="/login" />;
    }


    else if( administratorRoute && attendantRoute ) {
        if( user.administrator === false && user.attendant === false ) {
            return <Navigate to="/not-permission" />;
        }

    }
    else if( administratorRoute || attendantRoute ) {
        if( administratorRoute === true && user.administrator === false ) {
            //console.log("administratorRoute: ", user)
            return <Navigate to="/not-permission" />;
        }
        else if( attendantRoute === true && user.attendant === false ) {
            return <Navigate to="/not-permission" />;
        }

    }
    
    else if( user && !user.name ) {
        return <Navigate to="/login" />;
    }
    
    return (
        <Outlet />
    )
};

export default RouteGuard;