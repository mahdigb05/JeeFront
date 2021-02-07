import { Collapse } from "antd";
import Navbar from "../navBar/NavBar";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FilieresList = () => {
  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <h3 className="float-left">Filières</h3>
        <br />
        <hr />
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <Collapse defaultActiveKey="1">
              <Panel header="This is panel nest panel" key="1">
                <p>
                  <a href="https://google.com">google</a>
                </p>
              </Panel>
            </Collapse>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FilieresList;
