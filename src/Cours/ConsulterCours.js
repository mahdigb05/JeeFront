import React, { useContext, useEffect } from "react";
import { Table, Space, Button } from "antd";
import NavBar from "../navBar/NavBar";
import { CoursContext } from "../contexts/CoursContext";
import CoursService from "../services/CoursService";
import axios from "axios";

const ConsulterCours = (id_module) => {
  const coursContext = useContext(CoursContext);
  const { cours, setCours } = coursContext;

  useEffect(() => {
    CoursService.getAllCoursByModule(id_module).then((res) => {
      setCours(res.data);
    });
  }, []);

  function handleClick(data) {
    //e.preventDefault();
    console.log(data.id_cours);
    //props.history.push("/Cours",id_module);
  }

  console.log(id_module.location.state);
  const columns = [
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
    {
      title: "Cours",
      dataIndex: "cours",
      key: "cours",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            // onClick={}
          >Télécharger</Button>
        </Space>
      ),
    },
  ];
  /*const cours = [
        {
            titre : 'cours',
            cours : 'fichier',
            key : '1',
        }
    ]*/

  return (
    <div className="ConsulterCours">
      <NavBar></NavBar>
      <Table
        columns={columns}
        dataSource={cours}
        rowKey={(record) => record.id_cours}
      ></Table>
    </div>
  );
};

export default ConsulterCours;
