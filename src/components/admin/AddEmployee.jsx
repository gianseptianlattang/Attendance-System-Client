import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getAllEmployee } from "../../service/reducer/employeeReducer";

const baseUrl = "http://localhost:8000/";
const registerNewEmployee = async (request) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(`${baseUrl}auth/user`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

export const AddEmployeeModal = ({ isOpen, onClose }) => {
  const [joinDate, setJoinDate] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const dispatch = useDispatch();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleJoinDateChange = (date) => {
    setJoinDate(date);
  };

  const toast = useToast();

  const handleRegisterToast = (props, content) => {
    toast({
      description: content,
      status: props,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  function inputType() {
    return {
      email: formik.values.email,
      joinDate: joinDate.toISOString(),
      role: selectedRole,
      jobType: selectedJob,
      salary: formik.values.salary,
    };
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      joinDate: "",
      role: "",
      jobType: "",
      salary: "",
    },
    onSubmit: async () => {
      let request = inputType();
      const result = await registerNewEmployee(request);
      if (result[0] === "success") {
        handleRegisterToast("success", "Successfully add new employee");
        dispatch(getAllEmployee());
        onClose();
      } else {
        handleRegisterToast("error", "Failed add new employee");
      }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader color={"blue.500"}>Register New Employee</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Input employee email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Join Date</FormLabel>
                <DatePicker
                  selected={joinDate}
                  onChange={handleJoinDateChange}
                  placeholderText="Pick date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Choose role"
                  onChange={handleRoleChange}
                  value={selectedRole}
                >
                  <option value="1">Admin</option>
                  <option value="2">Employee</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Job Type</FormLabel>
                <Select
                  placeholder="Choose job type"
                  onChange={handleJobChange}
                  value={selectedJob}
                >
                  <option value="1">Full Time</option>
                  <option value="2">Moring Shift</option>
                  <option value="3">Night Shift</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Salary</FormLabel>
                <Input
                  id="salary"
                  placeholder="Input employee salary"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.salary}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
