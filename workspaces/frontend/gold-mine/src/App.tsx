import { useMediaQuery } from "react-responsive";

import NoticeForMobile from "./Components/UI/NoticeForMobile";

import Main from "./Components/Main";
import Footer from "./Components/Footer";

import style from "./App.module.css";

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (isMobile) {
    return <NoticeForMobile />;
  }

  return (
    <div className={`${style["App-body"]}`}>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
