import "./App.css";
import DepartmentMasterTable from "./DepartmentMaster/DepartmentTable";
import Dashboard from "./Dashboard/Dashboard";
import EmployeeTable from "./EmployeeForm/EmployeeTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./layout/navbar";
import { Segment } from "semantic-ui-react";

function App() {
  return (
    <div>
      <Router>
          <NavBar></NavBar>
          <Segment  className="App">
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>} />
          <Route path="/department" element={<DepartmentMasterTable></DepartmentMasterTable>} />
          <Route path="/employee" element={<EmployeeTable></EmployeeTable>} />
        </Routes>
        </Segment>
      </Router>
    </div>
  );
}

export default App;
