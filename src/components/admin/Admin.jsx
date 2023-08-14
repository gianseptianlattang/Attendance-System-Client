import {
  Box,
  Button,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { AddEmployeeModal } from "./AddEmployee";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeDetail } from "./EmployeeDetails";

export const Admin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const handleLogoutToast = () => {
    toast({
      description: "Successfully logged out",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const logout = () => {
    navigate("/");
    handleLogoutToast();
    localStorage.clear();
  };
  return (
    <>
      <Box padding={5} mx={10}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button colorScheme="blue" onClick={openRegisterModal}>
            Add Employee
          </Button>
          <Spacer />
          <Button colorScheme="blue" onClick={logout}>
            Logout{" "}
          </Button>
        </div>
        <AddEmployeeModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      </Box>

      <TableContainer borderWidth={2}>
        <Table
          size={{ base: "sm", md: "md" }}
          variant="striped"
          colorScheme="blue"
        >
          <Thead>
            <Tr>
              <Th width="fit-content" color={"blue.500"}>
                No
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                UserName
              </Th>
              <Th width="20%" color={"blue.500"}>
                Email
              </Th>
              <Th width="20%" color={"blue.500"}>
                Fullname
              </Th>
              <Th width="20%" color={"blue.500"}>
                Job Type
              </Th>
              <Th width="20%" color={"blue.500"}>
                Salary
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Action
              </Th>
              <Th width="fit-content" color={"blue.500"}>
                Status
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <EmployeeDetail />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
