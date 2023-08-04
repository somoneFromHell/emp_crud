import React, { useEffect, useState } from "react";
import { Table, Icon, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const DepartmentMasterTable = () => {
  const [depData, setDepData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3200/api/department")
      .then((response) => {
        setDepData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleEdit = (item) => {
    console.log(item);
  };

  const [modalOpan, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      departmentName: "",
      description: "",
    },
    validationSchema: Yup.object({
      departmentName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "too short for description")
        .required("Required"),
      description: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(3, "too short for description")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input 
          fluid
          label="department"
          placeholder="department"
          type="text"
          id="departmentName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.departmentName}
          error={formik.touched.departmentName && formik.errors.departmentName}
        />

        <Form.TextArea label="description" 
        placeholder="description..." 
        id="description"
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        error={formik.touched.description && formik.errors.description}
        />
        <Form.Button type="submit">Submit</Form.Button>
      </Form>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Department</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {depData.map((department) => (
            <Table.Row key={department._id}>
              <Table.Cell>{department.departmentName}</Table.Cell>
              <Table.Cell>{department.description}</Table.Cell>
              <Table.Cell>
                <Icon
                  color="blue"
                  name="pencil square"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                <Icon
                  color="red"
                  name="trash"
                  onClick={() => {
                    handleEdit(department._id);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default DepartmentMasterTable;
