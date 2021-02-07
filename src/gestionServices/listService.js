import { Tabs } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../contexts/globalContext";
import TableRow from "../gestionCours/tableRow";

const { TabPane } = Tabs;

const listService = () => {
  const { services } = useContext(GlobalContext);
  const searchColumns = ["id_service", "description"];

  const search = (rows) => {
    const output = rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row.module[column]
            .toString()
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase()) > -1
      )
    );
    return output;
  };

  return (
    <div>
      {CoursForm}
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
              <Search style={{ width: "35%" }} />
            </div>
            <table className="table  table-sm table-light tab ml-md-4 green">
              <thead className="font-weight-normal">
                <tr className="shadow-sm text-primary">
                  <th scope="col">Id service</th>
                  <th scope="col">description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search(services).map((service) => (
                  <TableRow service={service} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
