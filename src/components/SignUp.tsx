import { Field, Form, Formik } from "formik";
import React from "react";
import {
  Link as ReactRouterLink,
  Redirect,
  useHistory,
} from "react-router-dom";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import api from "../api";
import { useAuth } from "../hooks/useAuth";

interface SignUpFormValues {
  email: string;
  password: string;
  guildId: string;
}

function SignUp(): JSX.Element {
  const { user, loading } = useAuth();
  const toast = useToast();
  const history = useHistory();

  if (user) return <Redirect to={"/"} />;

  const handleSubmit = async (value: SignUpFormValues, formikHelpers) => {
    try {
      await api.post("/users", value);

      history.push("/");
      toast({
        title: "Account created.",
        description: "Your account has been created.",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occured.",
        description: "Failed to create account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
  return (
    <Flex justifyContent="center" flexDir="column" alignItems="center" p="8">
      <VStack spacing="16">
        <Text fontSize="3xl" fontWeight="bold">
          Kebabot
        </Text>
        <VStack>
          <Text fontSize="4xl" fontWeight="bold">
            Create an account
          </Text>
          <Text>
            Already have one?{" "}
            <Link as={ReactRouterLink} to="/login" color="teal.500">
              Login
            </Link>
          </Text>
        </VStack>
      </VStack>
      <Box bg="gray.700" p="8" borderRadius="md" w="lg" mt="8">
        <Formik
          initialValues={{ email: "", password: "", guildId: "" }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <VStack spacing="4">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      id="email"
                      isInvalid={form.errors.email && form.touched.email}
                      isRequired
                    >
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      <FormHelperText>
                        We'll never share your email.
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      id="password"
                      isInvalid={form.errors.password && form.touched.password}
                      isRequired
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input {...field} type="password" placeholder="••••••" />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="guildId">
                  {({ field }) => (
                    <FormControl id="guildId">
                      <FormLabel htmlFor="guildId">
                        Id of your Discord server
                      </FormLabel>
                      <Input {...field} type="text" placeholder="server ID" />
                    </FormControl>
                  )}
                </Field>

                <Button
                  isLoading={loading}
                  type="submit"
                  w="full"
                  bg="teal.500"
                >
                  Register
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
export default SignUp;
