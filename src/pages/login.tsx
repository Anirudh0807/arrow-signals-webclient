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
  Text, Center,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
  Link,
  // Link,

} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export default function LoginPage() {

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate=useNavigate();

  function handleFormUpdate(name: string, value: string) {
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }

  function validateForm(): boolean {
    let isValid = true;
    if (loginForm.username === "" || emailRegex.test(loginForm.username) === false) {
      setFormError((prevFormErrors) => {
        return { ...prevFormErrors, username: "Email is not valid!" };
      });
      isValid = false;
    }
    if (loginForm.password === "") {
      setFormError((prevFormErrors) => {
        return { ...prevFormErrors, password: "Password cannot be empty!" };
      });
      isValid = false;
    }
    return isValid;
  }

  function resetFormErrorDefault() {
    setFormError({
      username: "",
      password: "",
    });
  }
  function submitLoginForm() {
    resetFormErrorDefault();
    if (!validateForm()) {
      toast({
        title: "Invalid login form!",
        description: "Please fill in the form correctly!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setLoading(true);
      fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data['statusCode'] != null) {
            toast({
              title: "Un-Authorized",
              description: "User Doesn't Exists!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            localStorage.setItem('accessToken',data['token'] ?? 'ERROR')
            localStorage.setItem('userId',data['userData']['id']??'ERROR')
            navigate('/')

          }
        });

    }
  }

  return (
    <Flex
      maxH={"100vh"}
      maxW={"100vw"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack
        py={12}
        minW={'55vw'}
        minH={'100vh'}
        px={6} backgroundColor={'green'}>
      </Stack>
      <Stack
        w={'45vw'}
        maxH={'100vh'}
        py={12}
        px={6} backgroundColor={'black'}>
        <Flex
          align={"center"}
          minW={'40vw'}>
          <Stack
            mx={"auto"}
            w={{ sm: "xl", md: "md", lg: "md" }}
            py={12}
            px={6}>
            <Stack align={"flex-end"} >
              <Text color={'white'} >
                For Sign up<Button
                  bg={"#9359c6"}
                  color={"white"}
                  _hover={{
                    bg: "white",
                    color: 'black'
                  }} marginLeft={5}
                  padding={2} textDecoration={"ButtonText"}>
                  <Link href="/signup">Register Here</Link>
                </Button>
              </Text>
            </Stack>
            <Stack align={"left"} marginLeft={8}>
              <Heading fontSize={"3xl"} color={'white'}>Log in</Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={'black'}
              boxShadow={"lg"}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isInvalid={formError.username.length !== 0}>
                  <FormLabel color={'white'}>Email address</FormLabel>
                  <Input
                    type="email"
                    name="username"
                    color={'white'}
                    onChange={(e) =>
                      handleFormUpdate(e.target.name, e.target.value)
                    }/>
                  <FormErrorMessage>{formError.username}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  isInvalid={formError.password.length !== 0}>
                  <FormLabel color={'white'}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      color={'white'}
                      onChange={(e) =>
                        handleFormUpdate(e.target.name, e.target.value)
                      }/>
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label="show/hide password"
                        icon={showPassword ? <FiEye /> : <FiEyeOff />}
                        onClick={() =>
                          setShowPassword(
                            (prevShowPassword: boolean) => !prevShowPassword
                          )
                        }/>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formError.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    align={"flex-end"}
                    justify={"space-between"}>
                    <Link href="/signup" color={'white'}>Forgot password ?</Link>
                  </Stack>
                  <Button
                    bg={"#9359c6"}
                    color={"white"}
                    _hover={{
                      bg: "white",
                      color: 'black'
                    }}
                    onClick={submitLoginForm}>
                    {loading ? <Spinner /> : "Login"}
                  </Button>
                </Stack>
              </Stack>
              <Stack textAlign={"center"} mt="2" alignItems={"center"}>
                <Text fontSize={"sm"} color={'white'}>
                  Continue with
                </Text>
                <Button w={'full'} variant={'outline'} backgroundColor={'white'} borderColor={'#9359c6'} borderWidth={2} leftIcon={<FcGoogle />} isLoading={loading}>
                  <Center>
                    <Text>  {loading ? <Spinner /> : " Google"}</Text>
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