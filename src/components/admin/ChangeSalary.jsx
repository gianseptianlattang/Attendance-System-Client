import React from "react";
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
  FormErrorMessage,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllEmployee } from "../../service/reducer/employeeReducer";

const baseUrl = "http://localhost:8000/";
const updateCashier = async (request) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(`${baseUrl}profile/user`, request, {
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

const UpdateSchema = Yup.object().shape({
  monthlySalary: Yup.string().required("Salary is required"),
});

export const UpdateSalaryModal = ({ isOpen, onClose, item }) => {
  console.log(item);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleToast = (props, content) => {
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
      employeeId: item.id,
      monthlySalary: formik.values.monthlySalary,
    };
  }

  const formik = useFormik({
    initialValues: {
      username: item.monthlySalary,
    },
    validationSchema: UpdateSchema,
    onSubmit: async () => {
      let request = inputType();
      const result = await updateCashier(request);
      if (result[0] === "success") {
        handleToast("success", "Successfully update cashier");
        dispatch(getAllEmployee());
        onClose();
      } else {
        handleToast("error", "Failed update cashier");
      }
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"10px"}>
          <ModalHeader color={"blue.500"}>Edit Employee</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl
                isInvalid={
                  formik.touched.monthlySalary && formik.errors.monthlySalary
                }
              >
                <FormLabel>Salary</FormLabel>
                <Input
                  id="monthlySalary"
                  type="text"
                  placeholder="Input new salary"
                  onChange={formik.handleChange}
                  value={formik.values.monthlySalary}
                />
                {formik.touched.monthlySalary &&
                  formik.errors.monthlySalary && (
                    <FormErrorMessage>
                      {formik.errors.monthlySalary}
                    </FormErrorMessage>
                  )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
