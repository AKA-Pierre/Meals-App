import "./App.css";
import { useGlobalContext } from "./context";
//components
import Search from "./components/Search";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Favorites from "./components/Favorites";

function App() {
  const { showModal, favorites } = useGlobalContext();
  return (
    <main>
      <main>
        <Search />
        {favorites.length > 0 && <Favorites />}
        <Meals />
        {showModal && <Modal />}
      </main>
    </main>
  );
}

export default App;
