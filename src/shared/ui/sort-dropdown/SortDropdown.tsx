'use client';

import { Portal, Select, createListCollection } from '@chakra-ui/react';

type SortItemProps = {
  onFilterChange: (value: string) => void;
};

export function SortDropdown({ onFilterChange }: SortItemProps) {
  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      width="200px"
      onSelect={(item) => onFilterChange(item.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Sort by …" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

const frameworks = createListCollection({
  items: [
    { label: 'Name(A→Z)', value: 'name' },
    { label: 'Price(Low→High)', value: 'price' },
  ],
});
