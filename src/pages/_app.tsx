// pages/_app.tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import {Provider} from 'react-redux';
import { store } from "@/state/store";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <Provider store={store}>
     <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
   </Provider>
  );
}

export default MyApp;
