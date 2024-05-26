import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/poppins";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'poppins', sans-serif`,
    body: `'poppins', sans-serif`,
  },
});

export default theme;
