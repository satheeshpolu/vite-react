import {
  Box,
  Button,
  Container,
  Stack,
  Fieldset,
  Input,
  VStack,
  Heading,
  Text,
  Field,
  SimpleGrid,
  For,
  NativeSelect,
} from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Box
      position="relative"
      minH="90vh"
      bgGradient="linear(to-br, teal.50, blue.50)"
      overflow="hidden"
    >
      {/* Decorative background shapes */}
      <Box
        w="700px"
        h="700px"
        position="fixed"
        left="5%"
        top="5%"
        transform="rotate(62deg)"
        bg="teal.100"
        borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
        zIndex={0}
        rotate="10deg"
      />

      <Box
        left="60%"
        top="60%"
        bg="#5ac1b7"
        w="700px"
        h="700px"
        borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
        position="fixed"
        zIndex={0}
      />

      <Container maxW="lg" centerContent position="relative" zIndex={1} pt={16}>
        <VStack textAlign="center">
          <Heading fontSize={{ base: "3xl", md: "4xl" }} color="teal.600">
            Get in Touch
          </Heading>
          <Text fontSize="lg" color="gray.600">
            We'd love to hear from you. Fill out the form below and we’ll get
            back to you soon!
          </Text>
        </VStack>

        <Box as="form" p={8} mt={10} rounded="2xl" shadow="xl" w="100%">
          <SimpleGrid>
            <Fieldset.Root size="lg" maxW="md">
              <Stack>
                <Fieldset.Legend>Contact details</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please provide your contact details below.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input name="name" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email address</Field.Label>
                  <Input name="email" type="email" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Country</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="country">
                      <For
                        each={[
                          "Canada",
                          "Germany",
                          "United Kingdom",
                          "United States",
                        ]}
                      >
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </Fieldset.Content>

              <Button type="submit" alignSelf="flex-start" variant="outline">
                Submit
              </Button>
            </Fieldset.Root>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
