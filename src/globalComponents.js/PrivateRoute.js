import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Forbidden from '../Global-Components/Forrbiden'


const PrivateRoute = ({component : Component , role, ...rest}) => {

    
    const userRole = localStorage.getItem('user_role')
    
    return (
        <Route {...rest} render={(props) => {
            if(userRole && role.includes(userRole))
                return <Component {...props}/>
            else if(!role.includes(userRole))
                return <Forbidden />
            return <Redirect to='/' />
        }} />
    )
}


export default PrivateRoute