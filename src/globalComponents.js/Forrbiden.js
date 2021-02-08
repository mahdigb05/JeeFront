import React from 'react'
import {Button} from 'antd'
import {withRouter} from 'react-router-dom'
var bg = require('../../imgs/403.png')


const Forbidden = ({history}) => {
    
    const handleClick = () => {
        const userRole = localStorage.getItem('userRole')
        if(userRole)
            history.push('/acceuil')
        else
            history.push('/')

    }
    console.log("rest")
    return(
        <div className='fullScreen' style={{backgroundImage:'url('+bg+')',backgroundAttachment:'fixed',backgroundSize:'cover'}}>
            <div style={{width:'100%',marginTop:'33%',textAlign:'center'}}>
                <h4 style={{marginBottom:'2%'}}>vous n’avez pas accès à voir cette page</h4>
                <Button onClick={() => {handleClick()}} size='large'>retour</Button>
            </div>
        </div>
    )
}

export default withRouter(Forbidden);