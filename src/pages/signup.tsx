import {
  Flex,
  Box,
  Input,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
  Link,
  Image,
  Center,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/ARROW SIGNALS.png";

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignupPage() {
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleFormUpdate(name: string, value: string) {
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  }

  function validateForm(): boolean {
    let isValid = true;
    if (signupForm.fullName === "") {
      setFormError((prevFormErrors) => ({
        ...prevFormErrors,
        fullName: "Full name cannot be empty!",
      }));
      isValid = false;
    }
    if (signupForm.email === "" || !emailRegex.test(signupForm.email)) {
      setFormError((prevFormErrors) => ({
        ...prevFormErrors,
        email: "Email is not valid!",
      }));
      isValid = false;
    }
    if (signupForm.password === "") {
      setFormError((prevFormErrors) => ({
        ...prevFormErrors,
        password: "Password cannot be empty!",
      }));
      isValid = false;
    }
    if (signupForm.confirmPassword !== signupForm.password) {
      setFormError((prevFormErrors) => ({
        ...prevFormErrors,
        confirmPassword: "Passwords do not match!",
      }));
      isValid = false;
    }
    if (signupForm.phoneNumber === "") {
      setFormError((prevFormErrors) => ({
        ...prevFormErrors,
        phoneNumber: "Phone number cannot be empty!",
      }));
      isValid = false;
    }
    return isValid;
  }

  function resetFormErrorDefault() {
    setFormError({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
  }

  function submitSignupForm() {
    resetFormErrorDefault();
    if (!validateForm()) {
      toast({
        title: "Invalid signup form!",
        description: "Please fill in the form correctly!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setLoading(true);
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupForm.fullName,
          email: signupForm.email,
          password: signupForm.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data["statusCode"] != null) {
            toast({
              title: data["message"],
              description: data.message || "Failed to signup!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            localStorage.setItem("accessToken", data["token"] ?? "ERROR");
            localStorage.setItem("userId", data["userData"]["id"] ?? "ERROR");
            console.log("Access Token ", localStorage.getItem("accessToken"));
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Signup failed:", error);
          setLoading(false);
          toast({
            title: "Signup Failed",
            description: "Failed to signup! Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        });
    }
  }

  return (
    <Flex
      maxH={"100vh"}
      maxW={"100vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack minW={"55vw"} minH={"100vh"} px={6} bgColor={"red"}></Stack>
      <Stack w={"45vw"} px={6} backgroundColor={"black"} maxH={"100vh"}>
        <Flex align={"center"} minW={"40vw"}>
          <Stack
            mx={"auto"}
            w={{ sm: "xl", md: "md", lg: "md" }}
            py={12}
            px={6}
          >
            <Stack align={"flex-end"}></Stack>
            <Stack align={"left"} marginLeft={8}>
              <Image src={logo} alt="" h={16} w={16} borderRadius={8} />
              <Heading size="md" color={"white"} fontWeight={700} mt={2}>
                Sign Up
              </Heading>
              <Text color={"whiteAlpha.600"} fontSize={"md"}>
                Already have an account?
                <Link href="/login" ml={2} color={"blue.300"}>
                  Login.
                </Link>
              </Text>
            </Stack>
            <Box rounded={"lg"} bg={"black"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl
                  id="fullName"
                  isInvalid={formError.fullName.length !== 0}
                >
                  <FormLabel color={"white"}>Full Name</FormLabel>
                  <Input
                    type="text"
                    name="fullName"
                    color={"white"}
                    onChange={(e) =>
                      handleFormUpdate(e.target.name, e.target.value)
                    }
                  />
                  <FormErrorMessage>{formError.fullName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="email"
                  isInvalid={formError.email.length !== 0}
                >
                  <FormLabel color={"white"}>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    color={"white"}
                    onChange={(e) =>
                      handleFormUpdate(e.target.name, e.target.value)
                    }
                  />
                  <FormErrorMessage>{formError.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  isInvalid={formError.password.length !== 0}
                >
                  <FormLabel color={"white"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      color={"white"}
                      onChange={(e) =>
                        handleFormUpdate(e.target.name, e.target.value)
                      }
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="show/hide password"
                        icon={showPassword ? <FiEye /> : <FiEyeOff />}
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword: boolean) => !prevShowPassword
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formError.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="confirmPassword"
                  isInvalid={formError.confirmPassword.length !== 0}
                >
                  <FormLabel color={"white"}>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    color={"white"}
                    onChange={(e) =>
                      handleFormUpdate(e.target.name, e.target.value)
                    }
                  />
                  <FormErrorMessage>
                    {formError.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
                {/* <FormControl
                  id="phoneNumber"
                  isInvalid={formError.phoneNumber.length !== 0}
                >
                  <FormLabel color={"white"}>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    color={"white"}
                    onChange={(e) =>
                      handleFormUpdate(e.target.name, e.target.value)
                    }
                  />
                  <FormErrorMessage>{formError.phoneNumber}</FormErrorMessage>
                </FormControl> */}
                <Button
                  bg={"#9359c6"}
                  color={"white"}
                  _hover={{
                    bg: "white",
                    color: "black",
                  }}
                  onClick={submitSignupForm}
                >
                  {loading ? <Spinner /> : "Create Account"}
                </Button>
              </Stack>
              <Stack textAlign={"center"} mt="4" alignItems={"center"}>
                <Text fontSize={"sm"} color={"white"}>
                  Or
                </Text>
                <Button
                  w={"full"}
                  variant={"outline"}
                  borderColor={"#9359c6"}
                  borderWidth={2}
                  leftIcon={<FcGoogle />}
                  isLoading={loading}
                  mt={2}
                >
                  <Center>
                    <Text> {loading ? <Spinner /> : "Google"}</Text>
                  </Center>
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
