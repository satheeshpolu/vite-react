import { toaster } from '@/shared/ui/chakra';

const useToaster = () => {
  const showToast = (title: string, description: string, type: 'success' | 'error' | 'warning') => {
    toaster.create({ title, description, type });
  };

  return { showToast };
};

export { useToaster };
