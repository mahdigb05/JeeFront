import React, {useContext, useEffect} from 'react';
import {Table, Space, Button} from 'antd';
import NavBar from '../navBar/NavBar'
import {ModuleContext}  from "../contexts/ModuleContext"
import ModuleService from "../services/ModuleService"


const ListeModuleByEtudiant =  (props) => {

    const modulesContext = useContext(ModuleContext)
    const {modules, setModules} = modulesContext


    useEffect(() => {
        console.log(props.location.state);
        ModuleService.getAllModulesBySemestre(props.location.state).then((res)=>{
            console.log(res.data)
            setModules(res.data)
        })
    },[])

    function handleClickCours(module){
        console.log(module.id_module);
        props.history.push("/Cours",module.id_module);
    }

    const columns = [
        {
            title: 'Module',
            dataIndex: 'nom_module',
            key: 'nom_module'
        },
        {
            title : 'Action',
            key : 'action',
            render : (_, record) => (
            <Space size="middle">
                <Button type="primary" onClick = {() => handleClickCours(record)}>Cours</Button>
            </Space>
            )
        }
    ]
    
    
    return(
        <div className = "ListeModulesByEtudiant">
            <NavBar></NavBar>
            <Table columns = {columns} dataSource = {modules} rowKey={record => record.id_module} ></Table>
        </div>
    )
}

export default ListeModuleByEtudiant;