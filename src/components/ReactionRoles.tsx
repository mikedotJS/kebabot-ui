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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import EmojiPicker from "emoji-picker-react";
import { FiSmile, FiTrash, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import * as Yup from "yup";
import api from "../api";

interface ReactionRolesFormValues {
  reactionRolesRules: [
    {
      id?: string;
      message: string;
      reactionRoles: {
        id?: string;
        reaction_id: string;
        role_discord_id: string;
      }[];
      channel_id: string;
    }
  ];
}

export const ReactionRoles = (): JSX.Element => {
  const { user } = useAuth();
  const toast = useToast();

  const handleSubmit = (values: ReactionRolesFormValues, formikHelpers) => {
    try {
      Promise.all(
        values.reactionRolesRules.map((reactionRolesRule, i) =>
          api.patch(
            `/reactionRolesRules/${reactionRolesRule.id}`,
            formatReactionRolesRulesInput(values.reactionRolesRules[i])
          )
        )
      );

      toast({
        title: "Rules updated.",
        description: "Your rules have been updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "An error occured.",
        description: "Your rules have not been updated",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    reactionRolesRules: Yup.array(
      Yup.object().shape({
        message: Yup.string().required(),
        reactionRoles: Yup.array(
          Yup.object().shape({
            id: Yup.string(),
            reaction_id: Yup.string().required(),
            role_discord_id: Yup.string().required(),
          })
        )
          .min(1)
          .required(),
        channel_id: Yup.string().required(),
      })
    ),
  });

  return (
    <Box
      w="full"
      mt="4"
      overflowY="scroll"
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
      maxH="full"
    >
      <VStack alignItems="flex-start" w="full">
        <Formik<ReactionRolesFormValues>
          initialValues={{
            reactionRolesRules: user.reactionRolesRules.map(
              ({ channel_id, message, id, reactionRoles }) => {
                return {
                  id,
                  message,
                  reactionRoles,
                  channel_id,
                };
              }
            ),
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ isSubmitting, setFieldValue, values, isValid, dirty }) => {
            return (
              <Form style={{ width: "100%" }}>
                <VStack alignItems="flex-start" w="full" spacing="6">
                  {values.reactionRolesRules.map((reactionRolesRule, i) => (
                    <VStack alignItems="flex-start" w="full">
                      <Field name={`reactionRolesRules[${i}].message`}>
                        {({ field, form }) => {
                          return (
                            <FormControl
                              id={`reactionRolesRules[${i}].message`}
                              isInvalid={
                                form.errors.message && form.touched.message
                              }
                            >
                              <FormLabel
                                htmlFor={`reactionRolesRules[${i}].message`}
                              >
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    rightIcon={<Icon as={FiChevronDown} />}
                                    size="xs"
                                    mr="2"
                                  >
                                    {user.channels.find(
                                      (channel) =>
                                        channel.id ===
                                        reactionRolesRule.channel_id
                                    )?.name || "Channels"}
                                  </MenuButton>
                                  <MenuList>
                                    {user.channels.map((channel) => (
                                      <MenuItem
                                        onClick={() =>
                                          setFieldValue(
                                            `reactionRolesRules[${i}].channel_id`,
                                            channel.id
                                          )
                                        }
                                      >
                                        {channel.name}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </Menu>

                                {i > 0 && (
                                  <Button
                                    onClick={() =>
                                      setFieldValue(
                                        "reactionRolesRules",
                                        values.reactionRolesRules.filter(
                                          (reactionRolesRule, _i) => i !== _i
                                        )
                                      )
                                    }
                                    size="xs"
                                  >
                                    <Icon as={FiTrash} />
                                  </Button>
                                )}
                              </FormLabel>
                              <Textarea
                                {...field}
                                placeholder="Your message..."
                              />
                              <FormErrorMessage>
                                {form.errors.message}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>

                      <FieldArray
                        name={`reactionRolesRules[${i}].reactionRoles`}
                        render={(arrayHelpers) => (
                          <VStack alignItems="flex-start">
                            {reactionRolesRule.reactionRoles.map(
                              (reactionRole, index) => (
                                <HStack key={index}>
                                  <Field
                                    name={`reactionRolesRules[${i}].reactionRoles.${index}`}
                                  >
                                    {({ field }) => {
                                      return (
                                        <Popover isLazy>
                                          <PopoverTrigger>
                                            <Button size="sm">
                                              {field.value.reaction_id ? (
                                                <span
                                                  dangerouslySetInnerHTML={{
                                                    __html: `&#x${field.value.reaction_id.toUpperCase()};`,
                                                  }}
                                                ></span>
                                              ) : (
                                                <Icon
                                                  as={FiSmile}
                                                  color="white"
                                                />
                                              )}
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent w="fit-content">
                                            <EmojiPicker
                                              native
                                              onEmojiClick={(_, emoji) => {
                                                setFieldValue(
                                                  `reactionRolesRules[${i}].reactionRoles.${index}.reaction_id`,
                                                  emoji.unified
                                                );
                                              }}
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      );
                                    }}
                                  </Field>

                                  <Field
                                    name={`reactionRolesRules[${i}].reactionRoles.${index}.role_discord_id`}
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
                              )
                            )}

                            <Button
                              onClick={() =>
                                arrayHelpers.push({
                                  reaction_id: "",
                                  role_discord_id: "",
                                })
                              }
                              size="xs"
                            >
                              Add reaction role
                            </Button>
                          </VStack>
                        )}
                      />
                    </VStack>
                  ))}

                  <Flex>
                    <Button
                      onClick={() => {
                        setFieldValue(
                          "reactionRolesRules",
                          values.reactionRolesRules.concat({
                            message: "",
                            reactionRoles: [],
                            channel_id: "",
                          })
                        );
                      }}
                      size="xs"
                    >
                      Add channel
                    </Button>
                  </Flex>
                  <Flex justifyContent="flex-end" w="full">
                    <Button
                      bg="teal.500"
                      isLoading={isSubmitting}
                      isDisabled={!isValid || !dirty}
                      type="submit"
                      size="sm"
                    >
                      Save changes
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

function formatReactionRolesRulesInput(input: {
  id?: string;
  message: string;
  reactionRoles: {
    id?: string;
    reaction_id: string;
    role_discord_id: string;
  }[];
  channel_id: string;
}) {
  return {
    ...input,
    channelId: input.channel_id,
    reactionRoles: input.reactionRoles.map((reactionRole) => ({
      id: reactionRole.id,
      reactionId: reactionRole.reaction_id,
      roleDiscordId: reactionRole.role_discord_id,
    })),
  };
}
