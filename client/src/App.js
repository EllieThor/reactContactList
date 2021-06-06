import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import Main from "./pages/main";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
