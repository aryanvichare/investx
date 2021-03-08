import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { ThemeProvider } from '@/hooks/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
