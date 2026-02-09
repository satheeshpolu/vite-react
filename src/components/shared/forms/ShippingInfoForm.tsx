import { Accordion, Box, Heading, HStack, Input, Separator, Span } from '@chakra-ui/react';
import { Field, defineStyle } from '@chakra-ui/react';
import React from 'react';
import { FaShare, FaShuttleVan } from 'react-icons/fa';

const floatingStyles = defineStyle({
  pos: 'absolute',
  bg: 'bg',
  px: '0.5',
  top: '-3',
  insetStart: '2',
  fontWeight: 'normal',
  pointerEvents: 'none',
  transition: 'position',
  _peerPlaceholderShown: {
    color: 'fg.muted',
    top: '2.5',
    insetStart: '3',
  },
  _peerFocusVisible: {
    color: 'fg',
    top: '-3',
    insetStart: '2',
  },
});

export type ShippingInfo = {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
};

type ShippingInfoFormProps = {
  values: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
};

export const ShippingInfoForm: React.FC<ShippingInfoFormProps> = ({ values, onChange }) => (
  <>
    <Accordion.Root collapsible defaultValue={[]}>
      <Accordion.Item value={'item.value'}>
        <Accordion.ItemTrigger>
          <Span flex="1" display="inline-flex" alignItems="center" gap={2}>
            <FaShuttleVan size={24} color="rgb(62, 163, 154)" />
            {'Shipping Info'}
          </Span>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <Field.Root>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={values.fullName}
                  onChange={(e) => onChange('fullName', e.target.value)}
                />
                <Field.Label css={floatingStyles}>Full Name</Field.Label>
              </Box>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={values.streetAddress}
                  onChange={(e) => onChange('streetAddress', e.target.value)}
                />
                <Field.Label css={floatingStyles}>Street Address</Field.Label>
              </Box>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={values.city}
                  onChange={(e) => onChange('city', e.target.value)}
                />
                <Field.Label css={floatingStyles}>City</Field.Label>
              </Box>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={values.postalCode}
                  onChange={(e) => onChange('postalCode', e.target.value)}
                />
                <Field.Label css={floatingStyles}>Postal Code</Field.Label>
              </Box>
              <Box pos="relative" w="full">
                <Input
                  className="peer"
                  placeholder=""
                  value={values.country}
                  onChange={(e) => onChange('country', e.target.value)}
                />
                <Field.Label css={floatingStyles}>Country</Field.Label>
              </Box>
            </Field.Root>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  </>
);
