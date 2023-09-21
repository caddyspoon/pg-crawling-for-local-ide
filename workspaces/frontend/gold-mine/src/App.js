import Main from "./Components/Main";
import Footer from "./Components/Footer";

import style from "./App.module.css";

function App() {
	return (
		<div className={`${style["App-body"]}`}>
			<Main />
			<Footer />
		</div>
	);
}

export default App;
