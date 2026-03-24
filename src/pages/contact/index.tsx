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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();

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
          <Heading fontSize={{ base: '3xl', md: '4xl' }} color="teal.600">
            {t('contact.title')}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {t('contact.description')}
          </Text>
        </VStack>

        <Box as="form" p={8} mt={10} rounded="2xl" shadow="xl" w="100%">
          <SimpleGrid>
            <Fieldset.Root size="lg" maxW="md">
              <Stack>
                <Fieldset.Legend>{t('contact.form.title')}</Fieldset.Legend>
                <Fieldset.HelperText>{t('contact.form.description')}</Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>{t('contact.form.name')}</Field.Label>
                  <Input name="name" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>{t('contact.form.email')}</Field.Label>
                  <Input name="email" type="email" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>{t('contact.form.country')}</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="country">
                      <For each={['Germany', 'Canada', 'United Kingdom', 'United States']}>
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

              <Button
                type="submit"
                alignSelf="flex-start"
                variant="outline"
                bg="#14b8a6"
                color="#c9f9f4"
              >
                {t('contact.form.action')}
              </Button>
            </Fieldset.Root>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
