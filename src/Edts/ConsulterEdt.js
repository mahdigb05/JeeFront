import React, {useContext, useEffect} from 'react';
import {Table, Space, Button} from 'antd';
import NavBar from '../navBar/NavBar'
import  {EdtContext}  from "../contexts/EdtContext";
import EdtService from "../services/EdtService"


const ConsulterEdt =  () => {

    const edtContext = useContext(EdtContext)
    const {edts, setEdts} = edtContext


    useEffect(() => {
        EdtService.getAllEdts().then((res) => {
            setEdts(res.data)
        })
    },[])

    function handleClick(data){
        //e.preventDefault();
        console.log(data.idEdt);
        //props.history.push("/Cours",id_module);
    }

    const columns = [
        {
            title: 'Niveau',
            dataIndex: 'titre',
            key: 'titre'
        },
        {
            title: 'Saison',
            dataIndex: 'saison',
            key: 'saison'
        },
        {
            title : 'Action',
            key : 'action',
            render : (_, record) => (
            <Space size="middle">
                <Button type="primary" onClick = {() => handleClick(record)} >Télécharger</Button>
            </Space>
            )
        }
    ]
    
    return(
        <div className = "SaisieNoteAbsence">
            <NavBar></NavBar>
            <Table columns = {columns} dataSource = {edts} rowKey={record => record.idEdt}>
            </Table>
        </div>
    )
}

export default ConsulterEdt;