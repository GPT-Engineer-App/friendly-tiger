import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, FormControl, FormLabel, useToast, Heading, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://backengine-ysfv.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "We've created your account.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error("Could not create account.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-ysfv.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Logged in.",
          description: "You've been logged in successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || "Could not log in.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="stretch">
          {!isLoggedIn ? (
            <>
              <Heading>Login or Sign Up</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
              <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Heading>Welcome!</Heading>
              <Text>You're now logged in!</Text>
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
