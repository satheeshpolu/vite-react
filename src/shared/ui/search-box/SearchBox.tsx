import { Input, InputGroup } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useCallback, useMemo } from 'react';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const endElement = useMemo(
    () => value && <FaDeleteLeft cursor="pointer" onClick={handleClear} />,
    [value, handleClear]
  );

  return (
    <InputGroup startElement={<FaSearch />} endElement={endElement}>
      <Input
        aria-label="Search"
        placeholder={placeholder || 'Search...'}
        onChange={handleChange}
        value={value}
        w="100%"
        autoFocus
      />
    </InputGroup>
  );
}
