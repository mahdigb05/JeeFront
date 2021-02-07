import React, { useState, useContext, useEffect, useCallback } from "react";
import Navbar from "../navBar/NavBar";
import { EtudiantContext } from "../contexts/etudiantContext";
import { Input } from "antd";
import TableRow from "./tableRow";

const { Search } = Input;

const ListUsers = () => {
  const { etudiants } = useContext(EtudiantContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = [""];

  const search = (rows) => {
    const output = rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase()) > -1
      )
    );
    return output;
  };

  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <div className="row">
          <div className="col mt-lg-5 container">
            <div className="Tete form-inline" style={{ marginTop: "3%" }}>
              <h2
                className="font-weight-bold "
                style={{ marginRight: "22%", marginLeft: "2%" }}
              >
                Utilisateurs
              </h2>
              <Search
                style={{ width: "30%", marginRight: "23%" }}
                onChange={(value) => setSearchValue(value)}
              />
            </div>
            <table className="table  table-sm table-light tab ml-md-4 green">
              <thead className="font-weight-normal">
                <tr className="shadow-sm text-primary">
                  <th scope="col">Matricule</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prenom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search(etudiants).map((etudiant) => (
                  <TableRow etudiants={etudiant} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
