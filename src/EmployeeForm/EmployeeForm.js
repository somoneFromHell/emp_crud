import React, { useState ,useEffect} from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmployeeForm = (props) => {
  const [IsSubmitting,setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(props.empDataForUpdate||{
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    bloodGroup: "",
    email: "",
    contactNo: "",
    emergencyContactNo: "",
    address: "",
    companyEmail: "",
    companyContactNo: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
  });



  const postData = (data) => {
    setIsSubmitting(true)
    axios
      .post("http://localhost:3200/api/employee", data)
      .then((response) => {
        console.log("Response:", response.data.data);
        setIsSubmitting(false)
        props.closeModal()
        props.fatchData()
        props.setMessage({
          status:true,
          header:"data added successfully",
          content:"somthing",
          color:"green"
        })
        // Handle successful response here
      })
      .catch((error) => {
        console.error("Error:", error);
        props.setMessage({
          status:true,
          header:"error in submittiong data",
          content:"somthing",
          color:"red"
        })
        // Handle error here
      });

      
  };

  const updateData = data => {
    setIsSubmitting(true)

    axios
    .put("http://localhost:3200/api/employee/"+data._id, data)
    .then((response) => {
      console.log("Response:", response.data.data);
      setIsSubmitting(false)
      props.closeModal()
      props.fatchData()

      props.setMessage({
        status:true,
        header:"data updated successfully",
        content:"somthing",
        color:"green"
      })

      // Handle successful response here
    })
    .catch((error) => {
      console.error("Error:", error);
      props.setMessage({
        status:true,
        header:"error in update",
        content:"somthing",
        color:"red"
      })
      // Handle error here
    });
  }



  const bloodGroupOptions = [
    { text: "B+", value: "B+", key: "B+" },
    { text: "A+", value: "A+", key: "A+" },
    { text: "B-", value: "B-", key: "B-" },
    { text: "AB+", value: "AB+", key: "AB+" },
    { text: "AB-", value: "AB-", key: "AB-" },
    { text: "O+", value: "O+", key: "O+" },
    { text: "O-", value: "O-", key: "O-" },
    { text: "A-", value: "A-", key: "A-" },
  ];

  const designationOptions = [
    { text: "Manager", value: "Manager", key: "Manager" },
    { text: "Engineer", value: "Engineer", key: "Engineer" },
    { text: "Analyst", value: "Analyst", key: "Analyst" },
    { text: "Administrator", value: "Administrator", key: "Administrator" },
  ];

  const departmentOptions = [
    { text: "HR", value: "HR", Key: "Human Resources" },
    { text: "IT", value: "IT", Key: "Information Technology" },
    { text: "Finance", value: "Finance", Key: "Finance" },
    { text: "Marketing", value: "Marketing", Key: "Marketing" },
  ];

  const options = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "o", text: "Other", value: "other" },
  ];

  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "to short for first name")
        .required("Required"),

      middleName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "to short for middle name")
        .required("Required"),

      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(3, "to short for last name")
        .required("Required"),

      birthDate: Yup.string().required("Required"),

      bloodGroup: Yup.string().required("Required"),

      email: Yup.string("its not evan a string")
        .email("enter valid email")
        .required("Required"),

      contactNo: Yup.string()
        .required()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ).max(10,"not valid").min(10,"not valid"),
      emergencyContactNo: Yup.string().matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ).max(10,"not valid").min(10,"not valid"),
      companyEmail: Yup.string("its not evan a string")
        .required("Required")
        .email("enter valid email"),

      department: Yup.string().required("required"),
      position: Yup.string().required("required"),
      salary: Yup.number().required("required"),
      joiningDate: Yup.date().required("required"),
      address: Yup.string("not valid input")
        .required("required")
        .min(5, "not enaugh info")
        .max(100, "only take less than 100 characors"),

    }),
    onSubmit: values => {
       if(values._id){
         updateData(values)
       }else{
         postData(values)
       }
    },
  });

  return (
    <div>
      
      <Form  onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Input
            label="first name"
            placeholder="enter first name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          ></Form.Input>

          <Form.Input
            label="middle name"
            placeholder="enter middle name"
            name="middleName"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.middleName && formik.errors.middleName}
          ></Form.Input>

          <Form.Input
            label="last name"
            placeholder="enter last name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          ></Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Birthdate"
            placeholder="birthDate"
            type="date"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.birthDate && formik.errors.birthDate}
          ></Form.Input>

          <Form.Field
            control="select"
            label="bloodGroup"
            name="bloodGroup"
            value={formik.values.bloodGroup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bloodGroup && formik.errors.bloodGroup}
            options={bloodGroupOptions}
          >
            <option value="">--select--</option>

            {bloodGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="email"
            placeholder="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          ></Form.Input>

          <Form.Input
            label="contact No."
            placeholder="contactNo"
            name="contactNo"
            value={formik.values.contactNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNo && formik.errors.contactNo}
          ></Form.Input>

          <Form.Input
            label="emergency Contact No."
            placeholder="emergency Contact No."
            name="emergencyContactNo"
            value={formik.values.emergencyContactNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emergencyContactNo &&
              formik.errors.emergencyContactNo
            }
          ></Form.Input>
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="company Email"
            placeholder="company Email"
            name="companyEmail"
            value={formik.values.companyEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.companyEmail && formik.errors.companyEmail}
          ></Form.Input>

          <Form.Input
            label="company Contact No"
            placeholder="company Contact No"
            name="companyContactNo"
            value={formik.values.companyContactNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyContactNo && formik.errors.companyContactNo
            }
          ></Form.Input>

          <Form.Field
            control="select"
            label="department"
            placeholder="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.department && formik.errors.department}
            options={departmentOptions}
          >
            <option value="">--select--</option>

            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field
            control="select"
            label="position"
            placeholder="position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && formik.errors.position}
            options={designationOptions}
          >
            <option value="">--select--</option>

            {designationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Field>

          <Form.Input
            label="salary"
            placeholder="salary"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.salary && formik.errors.salary}
          ></Form.Input>

          <Form.Input
            type="date"
            label="joiningDate"
            placeholder="joiningDate"
            name="joiningDate"
            value={formik.values.joiningDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.joiningDate && formik.errors.joiningDate}
          ></Form.Input>
        </Form.Group>

        <Form.TextArea
          label="Address"
          placeholder="enter full address..."
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
        />
        <Form.Checkbox label="Employment Status" />
        <Form.Button type="submit" >Submit</Form.Button>
      </Form>
    </div>
  );
};

export default EmployeeForm;
