import React from 'react'
import {Button} from 'antd'
var bg = require('../../imgs/404.png')

const PageNotFound = ({history}) => {
    
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
            <div style={{width:'100%',marginTop:'30%',textAlign:'center'}}>
                <h3 style={{color:"white",marginBottom:'2%'}}>nous n’avons pas pu trouver ce que vous cherchez</h3>
                <Button onClick={() => {handleClick()}} size='large'>retour à l'accueil</Button>
            </div>
        </div>
    )
}

export default PageNotFound;