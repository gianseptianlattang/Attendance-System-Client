import { Box, Flex, Heading, Button, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../service/reducer/employeeReducer";
import axios from "axios";

const baseUrl = "http://localhost:8000/";
const clockIn = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      `${baseUrl}employee/clockin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

const clockOut = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      `${baseUrl}employee/clockout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return ["success", data];
  } catch (err) {
    console.log(err.message);
    return "error";
  }
};

export const Employee = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.reportUser);
  console.log(result);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      setCurrentDateTime(now.toLocaleString([], options));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const handleClockIn = async () => {
    await clockIn();
    dispatch(getUserData());
  };

  const handleClockOut = async () => {
    await clockOut();
    dispatch(getUserData());
  };

  return (
    <Box
      backgroundImage="/image/backgroundlogin.jpg"
      minHeight="100vh"
      backgroundSize="cover"
    >
      <Flex justify="center" align="center" minHeight="100vh">
        <Box
          margin={{ base: "20px", md: "50px" }}
          borderWidth="1px"
          borderRadius="lg"
          p={{ base: "10px", md: "50px" }}
          boxShadow="lg"
          bg="white"
          maxW="100%"
        >
          <Stack direction={{ base: "column", md: "row" }}>
            <Flex
              p={{ base: "20px", md: "30px" }}
              flex={1}
              align="center"
              justify="center"
            >
              <Stack
                spacing={4}
                w="full"
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                p={10}
              >
                <Heading fontSize="2xl">Welcome</Heading>
                <Heading color="blue.500" fontSize="md">
                  Don't forget to clock in !!
                </Heading>

                <Text fontSize="2xl">Current Date and Time:</Text>
                <Text fontSize="2xl">{currentDateTime}</Text>

                <Stack spacing={6}>
                  {result.length === 0 ? (
                    <Button
                      type="submit"
                      colorScheme="blue"
                      variant="solid"
                      onClick={handleClockIn}
                    >
                      Check In
                    </Button>
                  ) : !result[0].Attendances[result[0].Attendances.length - 1]
                      .clockOut ? (
                    <Button
                      type="submit"
                      colorScheme="blue"
                      variant="solid"
                      onClick={handleClockOut}
                    >
                      Check Out
                    </Button>
                  ) : (
                    <Text>You are awesome!</Text>
                  )}
                </Stack>
              </Stack>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
