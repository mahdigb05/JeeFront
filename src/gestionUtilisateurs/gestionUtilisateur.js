import React, {useState, useContext, useEffect, useCallback} from 'react';
// import User from './User';
import Navbar from '../navBar/NavBar';
// import Sidebar from '../Global-Components/sidebar';
// import AddUser from './AddUser';
// import ModalUser from '../Modal/ModalUser';
// import {UserContext} from '../contexts/UserContext'
// import UserService from '../services/UserService'
import {Input} from 'antd'

const {Search} = Input

const ListUsers = () =>{



    return (
        <div className = "ListUsers">
            
            <Navbar/>
            <div className = "row">
                <div className = "col mt-lg-5 container">
                    <div className = "Tete form-inline" style={{marginTop:'3%'}}>
                        <h2 className = "font-weight-bold " style={{marginRight:'22%',marginLeft:'2%'}}>Utilisateurs</h2>
                        {/* <input className="form-control form-control-sm col-lg-4 searchbar mr-1" type="text" placeholder= "Recherche" value = {q} onChange = {(e) => setQ(e.target.value)}/> */}
                        <Search 
								
								style={{width:'30%', marginRight:'23%'}}
						/>
                    </div>
                    <table className="table  table-sm table-light tab ml-md-4 green">
                        <thead className="font-weight-normal">
                            <tr className="shadow-sm text-primary">
                                <th scope = "col">Matricule</th>
                                <th scope = "col">Nom</th>
                                <th scope = "col">Prenom</th>
                                <th scope = "col">Email</th>
                                <th scope = "col">Telephone</th>
                                <th scope = "col">Role</th>
                                <th scope = "col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                search(users).map((user,index)=>{
                                    return(
                                        <User key = {index} 
                                                user = {user}
                                        /> 
                                    )
                                })

                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListUsers;