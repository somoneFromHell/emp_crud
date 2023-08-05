import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import {
  Icon,
  Button,
  Modal,
  Popup,
  Message,

} from "semantic-ui-react";
import EmployeeForm from "./EmployeeForm";

const FormModal = (props) => {
  const triggerSubmit = () => {};
  return (
    <div>
      <Modal
        style={{ right: "0px", height: "auto" }}
        onClose={props.closeModal}
        open={props.isModalOpen}
        fatchData={props.fatchData}
      >
        <Modal.Header>Add employee Data</Modal.Header>
        <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
          <EmployeeForm
            empDataForUpdate={props.empDataForUpdate}
            setMessage = {props.setMessage}
            closeModal = {props.closeModal}
            fatchData = {props.fatchData}
          ></EmployeeForm>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="cancel"
            labelPosition="left"
            icon="checkmark"
            onClick={props.closeModal}
            negative
          />
          <Button
            content="save"
            labelPosition="right"
            icon="save"
            onClick={() => triggerSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [message, setMessageVariable] = useState({});

const setMessage = (da) => {
  setMessageVariable(da)
  setTimeout(function() {
    setMessageVariable({})
  }, 2000);
}

  const fatchData = () => {
    axios
      .get("http://localhost:3200/api/employee")
      .then((response) => {
        const fatchedData = response.data.data;
          fatchedData.map((item)=>{
            item.birthDate = item.birthDate.split("T")[0]
            item.joiningDate = item.joiningDate.split("T")[0]
          })
        
        setEmployeeData(fatchedData);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }


  const deleteData = (id) => {
    axios
    .delete("http://localhost:3200/api/employee/"+id)
    .then((response) => {
      fatchData()
      setMessage({
        status:true,
        header:"data deleted successfully",
        content:"deleted"||response,
        color:"brown"
      })
    })
    .catch((error) => {
      console.error("Error deleting employee data:", error);
    });
  }

  useEffect(fatchData, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empDataForUpdate, setFormData] = useState({});

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleEdit = (data) => {
    setIsModalOpen(true);
    setFormData(data);
    console.log(data);
  };


  return (
    <div className="">
      {message.status && (
        <Message
        
          success
          header={message.header}
          content={message.content}
          color={message.color}
        />
      )}

      <FormModal
        isModalOpen={isModalOpen}
        empDataForUpdate={empDataForUpdate}
        closeModal={closeModal}
        setMessage={setMessage}
        fatchData={fatchData}
      ></FormModal>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        add
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sr No</Table.HeaderCell>
            <Table.HeaderCell>Employee Code</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {/* <Table.HeaderCell>Birth Date</Table.HeaderCell> */}
            {/* <Table.HeaderCell>Blood Group</Table.HeaderCell> */}
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Contact No</Table.HeaderCell>
            <Table.HeaderCell>Emergency Contact No</Table.HeaderCell>
            {/* <Table.HeaderCell>Address</Table.HeaderCell> */}
            <Table.HeaderCell>Company Email</Table.HeaderCell>
            <Table.HeaderCell>Department</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Joining Date</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employeeData.map((employee) => (
            <Table.Row key={employee._id}>
              <Table.Cell>{employee.srNo}</Table.Cell>
              <Table.Cell>{employee.employeeCode}</Table.Cell>
              <Table.Cell>
                {employee.firstName +
                  " " +
                  employee.middleName +
                  " " +
                  employee.lastName}
              </Table.Cell>
              {/* <Table.Cell>{employee.birthDate}</Table.Cell> */}
              {/* <Table.Cell>{employee.bloodGroup}</Table.Cell> */}
              <Popup
                content={
                  "mail to" +
                  employee.firstName +
                  " " +
                  employee.middleName +
                  " " +
                  employee.lastName
                }
                trigger={<Table.Cell>{employee.email}</Table.Cell>}
              />

              <Table.Cell>{employee.contactNo}</Table.Cell>
              <Table.Cell>{employee.emergencyContactNo}</Table.Cell>
              {/* <Table.Cell>{employee.address}</Table.Cell> */}
              <Table.Cell>{employee.companyEmail}</Table.Cell>
              <Table.Cell>{employee.department}</Table.Cell>
              <Table.Cell>{employee.position}</Table.Cell>
              <Table.Cell>{employee.salary}</Table.Cell>
              <Table.Cell>{employee.joiningDate.split("T")[0]}</Table.Cell>
              <Table.Cell>
                <Icon
                  bordered
                  color="blue"
                  name="pencil square"
                  onClick={() => {
                    handleEdit(employee);
                  }}
                />

                <Icon
                  bordered
                  color="red"
                  name="trash"
                  onClick={() => {
                    deleteData(employee._id)
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployeeTable;
