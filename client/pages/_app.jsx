import GlobalStyle from "../styles/GlobalStyles";
import theme from "../styles/Theme";
import { ThemeProvider } from "styled-components";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
