import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8000/";
let dataUser;

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const fetchUser = async (values) => {
  try {
    const { data } = await axios.post(`${baseUrl}auth/login`, values);
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return ["success", data];
  } catch (err) {
    return "error";
  }
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLoginToast = (props, content) => {
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
      password: formik.values.password,
    };
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      let request = inputType();
      const userLogin = await fetchUser(request);
      if (userLogin[0] === "success") {
        handleLoginToast("success", "Successfully logged in");
      } else {
        handleLoginToast("error", "Failed to logged in");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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
                    Sign in to your account
                  </Heading>
                  <FormControl
                    isInvalid={formik.touched.email && formik.errors.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Input your email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        variant="filled"
                        placeholder="Input your password"
                        type={showPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <InputRightElement h="full">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack spacing={6}>
                    <Button type="submit" colorScheme="blue" variant="solid">
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </form>
  );
};
