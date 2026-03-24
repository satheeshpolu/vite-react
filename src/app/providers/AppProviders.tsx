import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary } from '../error-boundary';
import { Toaster } from '@/shared/ui/chakra';
import { setupInterceptors } from '@/shared/lib/http/interceptors';

setupInterceptors();

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Wraps all providers in the correct order.
 * Order matters: outermost providers should be most stable.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <QueryProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryProvider>
      </ErrorBoundary>
      <Toaster />
    </ThemeProvider>
  );
}
