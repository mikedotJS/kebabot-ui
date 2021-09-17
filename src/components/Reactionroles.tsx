import React from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import EmojiPicker from "emoji-picker-react";
import { FiPlus, FiSmile, FiTrash } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

interface ReactionRolesFormValues {
  message: string;
  reactionRoles: {
    id: string;
    reaction: { emojiCode: string; symbol: string | null };
    role: string;
  }[];
}

export const ReactionRoles = (): JSX.Element => {
  const { user } = useAuth();

  const handleSubmit = (values: ReactionRolesFormValues) => {
    alert(JSON.stringify(values));
  };

  return (
    <Box w="full">
      <VStack alignItems="flex-start" w="full">
        <Formik<ReactionRolesFormValues>
          initialValues={{
            message: "",
            reactionRoles: [],
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => {
            console.log("values", values);
            return (
              <Form style={{ width: "100%" }}>
                <VStack alignItems="flex-start" spacing="4">
                  <Field name="message">
                    {({ field, form }) => (
                      <FormControl
                        id="message"
                        isInvalid={form.errors.message && form.touched.message}
                      >
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <Textarea {...field} placeholder="Your message..." />
                        <FormErrorMessage>
                          {form.errors.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FieldArray
                    name="reactionRoles"
                    render={(arrayHelpers) => (
                      <VStack alignItems="flex-start" spacing="2">
                        {values.reactionRoles.map((reactionRole, index) => (
                          <HStack key={index} spacing="2">
                            <Field>
                              {({ field }) => {
                                return (
                                  <Popover>
                                    <PopoverTrigger>
                                      <Button size="sm">
                                        {field.value.reactionRoles[index]
                                          .reaction.symbol ?? (
                                          <Icon as={FiSmile} color="white" />
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      as={EmojiPicker}
                                      onEmojiClick={(_, emoji) => {
                                        setFieldValue(
                                          `reactionRoles.${index}.reaction`,
                                          {
                                            emojiCode: emoji.unified,
                                            symbol: emoji.emoji,
                                          }
                                        );
                                      }}
                                    ></PopoverContent>
                                  </Popover>
                                );
                              }}
                            </Field>

                            <Field
                              name={`reactionRoles.${index}.role`}
                              as={Select}
                              placeholder="Select role"
                              size="sm"
                              variant="filled"
                            >
                              {user.roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </Field>

                            <Button
                              onClick={() => arrayHelpers.remove(index)}
                              size="sm"
                            >
                              <Icon as={FiTrash} />
                            </Button>
                          </HStack>
                        ))}

                        <Button
                          onClick={() =>
                            arrayHelpers.push({
                              id: "",
                              reaction: { emojiCode: "", symbol: "" },
                              role: "",
                            })
                          }
                          size="sm"
                        >
                          <Icon as={FiPlus} size="sm" />
                        </Button>
                      </VStack>
                    )}
                  />

                  <Flex justifyContent="flex-end" w="full">
                    <Button
                      bg="teal.500"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </VStack>
              </Form>
            );
          }}
        </Formik>
      </VStack>
    </Box>
  );
};
