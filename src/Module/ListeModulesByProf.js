import React, {createContext, useContext, useEffect} from 'react';
import {Table, Space, Button} from 'antd';
import NavBar from '../navBar/NavBar'
import  {ModuleContext}  from "../contexts/ModuleContext"
import ModuleService from "../services/ModuleService"

const ListeModulesByProf =  (props) => {

    const modulesContext = useContext(ModuleContext)
    const {modules, setModules} = modulesContext


    useEffect(() => {
        //On doit recuperer l'email depuis la connexion du prof 
        //console.log(id_prof);
        ModuleService.getIdProfByEmail(localStorage.getItem("user_email")).then((res) => {
            ModuleService.getAllModulesByProf(res.data.id).then((result) => {
                setModules(result.data)
            })
        })
    },[]) 

    // useEffect(() => {
    //     //On doit recuperer l'email depuis la connexion du prof 
    //     //console.log(id_prof);
    //     console.log(professeur.id);
    //     ModuleService.getAllModulesByProf(professeur.id).then((res) => {
    //         setModules(res.data)
    //     })
    // },[]) 
    

    function handleClickNotesAbsence(module){
        console.log(module.id_module);
        props.history.push("/NoteAbsenceProf",module.id_module);
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
                <Button type="primary" onClick = {() => handleClickNotesAbsence(record)}>Notes et Absences</Button>
            </Space>
            )
        }
    ]
    
    
    return(
        <div className = "ListeModulesByProf">
            <NavBar></NavBar>
            <Table columns = {columns} dataSource = {modules} rowKey={record => record.id_module} ></Table>
        </div>
    )
}

export default ListeModulesByProf;