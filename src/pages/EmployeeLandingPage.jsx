import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Employee } from "../components/employee/Employee";
import { useNavigate } from "react-router-dom";
import { Attendance } from "../components/employee/Attendance";

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
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
    <Box>
      <Box padding={5} mx={10}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button colorScheme="blue" onClick={logout}>
            Logout
          </Button>
        </div>
      </Box>
      <Tabs>
        <TabList>
          <Tab>Management</Tab>
          <Tab>Attendance</Tab>
          <Tab>Report</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Employee />
          </TabPanel>
          <TabPanel>{/* <Attendance /> */}</TabPanel>
          <TabPanel>
            <p>Report</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LoginPage;
