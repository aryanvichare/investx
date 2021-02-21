import '@/styles/globals.css';
import { AuthProvider } from '@/lib/auth';
import { StockProvider } from '@/lib/stock';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StockProvider>
      <Component {...pageProps} />
      </StockProvider>
    </AuthProvider>
  );
}

export default MyApp;
