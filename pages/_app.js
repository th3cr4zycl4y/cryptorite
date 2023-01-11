import "../styles/globals.css";
import Layouts from "../components/Layouts";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <Layouts>
      <NextNProgress />
      <Component {...pageProps} />
    </Layouts>
  );
}

export default MyApp;
