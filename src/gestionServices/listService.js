import { Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/globalContext";
import TableRow from "../gestionServices/TableRow";
import Navbar from "../navBar/NavBar";
import uuid from "uuid/dist/v4";

const { Search } = Input;

const ListService = () => {
  const { servs, setServs, getRessourceFromApi } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState("");
  const searchColumns = ["id_service", "description"];

  const search = (rows) => {
    console.log(rows);
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

  useEffect(() => {
    getRessourceFromApi("http://localhost:8080/services", setServs);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <div className="row">
          <div className="col mt-lg-5 container">
            <div className="Tete form-inline" style={{ marginTop: "3%" }}>
              <h2
                className="font-weight-bold "
                style={{ marginRight: "33%", marginLeft: "2%" }}
              >
                Demandes de services
              </h2>
              {/* <input className="form-control form-control-sm col-lg-4 searchbar mr-1" type="text" placeholder= "Recherche" value = {q} onChange = {(e) => setQ(e.target.value)}/> */}
              <Search
                style={{ width: "35%" }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <table className="table  table-sm table-light tab ml-md-4 green">
              <thead className="font-weight-normal">
                <tr className="shadow-sm text-primary">
                  <th scope="col">Id service</th>
                  <th scope="col">description</th>
                  <th scope="col">Demandeur</th>
                  <th scope="col">Etat</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search(servs).map((service) => (
                  <TableRow service={service} key={uuid()} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListService;
