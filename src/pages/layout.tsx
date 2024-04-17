import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaStore, FaUser } from "react-icons/fa6";
import { FiBell, FiLogOut, FiMenu, FiSettings } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  isActive?: boolean;
  path: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  pathName: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: IoMdHome, path: "/" },
  { name: "Markets & Exchanges", icon: FaStore, path: "/markets" },
  { name: "Profile", icon: FaUser, path: "/profile" },
];

const SidebarContent = ({ onClose, pathName, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  function logOut() {
    localStorage.removeItem("accessToken");
    console.log(localStorage.getItem("ab"));
    toast({
      title: "Logged Out Successfully",
      description: "See you soon 👋👋👋",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    navigate("/login");
  }
  return (
    <Box
      transition="3s ease"
      bg={"#1b2028"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={"white"}
        >
          Arrow Signals
        </Text>
        <CloseButton
          color={"white"}
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Flex
        mt={4}
        direction={"column"}
        justify={"space-between"}
        minH={"89.7%"}
      >
        <Box>
          {LinkItems.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              path={link.path}
              isActive={link.name === pathName}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>

        <Box mb={5}>
          <NavItem
            key={"Settings"}
            icon={FiSettings}
            path="/settings"
            isActive={pathName === "Settings"}
          >
            {"Settings"}
          </NavItem>

          <NavItem
            key={"Logout"}
            icon={FiLogOut}
            onClick={logOut}
            isActive={pathName === "Settings"}
            path="/login"
          >
            {"Logout"}
          </NavItem>
        </Box>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, isActive, path, ...rest }: NavItemProps) => {
  return (
    <Link to={path}>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          alignItems="center"
          justifyContent={"flex-start"}
          p="4"
          mx="4"
          borderRadius="lg"
          bg={isActive ? "#9359c6" : ""}
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              fontSize="25"
              color={"white"}
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          <Text
            fontSize={"16"}
            fontWeight="medium"
            whiteSpace="nowrap"
            color={"white"}
          >
            {children}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"#121212"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        color={"#ffffff"}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Arrow Signals
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Popover>
          <PopoverTrigger>
            <Flex position="relative" align="center">
              <IconButton
                size="lg"
                variant="ghost"
                color={"white"}
                aria-label="open menu"
                icon={<FiBell />}
              />
              <Box
                position="absolute"
                top="-1"
                right="-1"
                bg="red.500"
                borderRadius="full"
                px={2}
                fontSize="sm"
                color="white"
              >
                {notificationCount}
              </Box>
            </Flex>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontSize={20} pt={4} fontWeight="bold" border="0">
              Notifications
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton p={4} />
            <PopoverBody
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="200px"
              overflowY="auto"
            >
              No new Notifications
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Flex alignItems={"center"}>
          <Avatar
            mr={10}
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </Flex>
      </HStack>
    </Flex>
  );
};

interface HomeProps {
  children: React.ReactNode;
  pathName: string;
}

const Layout = ({ children, pathName }: HomeProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        pathName={pathName}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} pathName={pathName} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Flex direction={"column"} flex={1}>
        <Box bg={"#121212"} ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;