import './App.css';
import IssuePage from './pages/IssuePage/IssuePage.js';
import IssueDetails from './pages/IssueDetails/IssueDetails.js';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import store from './store/index';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/issue" element={<IssuePage/>}/>
          <Route exact path="/detail" element={<IssueDetails/>}/>
          <Route path="*" element={<IssuePage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
