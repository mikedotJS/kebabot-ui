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
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link as ReactRouterLink, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const { user, login, loading } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (user) return <Redirect to="/" />;

  return (
    <Flex justifyContent="center" flexDir="column" alignItems="center" p="8">
      <VStack spacing="16">
        <Text fontSize="3xl" fontWeight="bold">
          Kebabot
        </Text>
        <VStack>
          <Text fontSize="4xl" fontWeight="bold">
            Sign in to your account
          </Text>
          <Text>
            Don't have an account?{" "}
            <Link as={ReactRouterLink} to="/signup" color="teal.500">
              Create one
            </Link>
          </Text>
        </VStack>
      </VStack>
      <Box bg="gray.700" p="8" borderRadius="md" w="lg" mt="8">
        <Formik
          initialValues={{ email: "", password: "" }}
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
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input {...field} type="password" placeholder="••••••" />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  isLoading={loading}
                  type="submit"
                  w="full"
                  bg="teal.500"
                >
                  Sign in
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default Login;
