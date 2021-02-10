import React, { useContext, useEffect } from "react";
import style from "../css/rectifpage.css";
import { Table } from "antd";
import NavBar from "../navBar/NavBar";
import NoteAbsenceService from "../services/NoteAbsenceService";
import { NoteAbsenceContext } from "../contexts/NoteAbsenceContext";

const NoteAbsenceEtudiant = () => {
  const noteAbsenceContext = useContext(NoteAbsenceContext);
  const { notesAbsences, setNotesAbsences } = noteAbsenceContext;

  useEffect(() => {
    //J'ai besoin de l'id d'etudiant
    NoteAbsenceService.getAllNotesAbsenceByEtudiant(1).then((res) => {
      //console.log(res.data);
      setNotesAbsences(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      width: "50%",
      render: (module) => module.nom_module,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "25%",
    },
    {
      title: "Absence",
      dataIndex: "absence",
      key: "absence",
      width: "25%",
    },
  ];

  return (
    <div>
      <NavBar className={style.content}></NavBar>
      <Table
        columns={columns}
        dataSource={notesAbsences}
        rowKey={(record) => record.id_note_absense}
      ></Table>
    </div>
  );
};

export default NoteAbsenceEtudiant;
