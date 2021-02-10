import React, {useContext, useEffect} from 'react';
import {Table, Space, Button} from 'antd';
import NavBar from '../navBar/NavBar'
import {SemestresContext}  from "../contexts/SemestresContext"
import SemestresService from "../services/SemestresService"


const ConsulterSemestres =  (props) => {

    const semestresContext = useContext(SemestresContext)
    const {semestres, setSemestres} = semestresContext


    useEffect(() => {
        SemestresService.getAllSemestres().then((res) => {
            setSemestres(res.data)
        })
    },[])

    function handleClick(data){
        //e.preventDefault();
        console.log(data.id_semestre);
        props.history.push("/ModulesEtudiant",data.id_semestre);
    }

    const columns = [
        {
            title: 'Titre',
            dataIndex: 'id_semestre',
            key: 'id_semestre'
        },
        {
            title : 'Action',
            key : 'action',
            render : (_, record) => (
            <Space size="middle">
                <Button type="primary" onClick = {() => handleClick(record)}>Modules</Button>
            </Space>
            )
        }
    ]
    
    return(
        <div className = "ConsulterSemestres">
            <NavBar></NavBar>
            <Table columns = {columns} dataSource = {semestres} rowKey={record => record.id_semestre}></Table>
        </div>
    )
}

export default ConsulterSemestres;