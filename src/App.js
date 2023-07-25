import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoaderMain from './components/LoaderMain';
import ListScreen from './components/ListScreen';
import DetailScreen from './components/DetailScreen';
import NotFound from './components/NotFound';
import CheckOnlineStatus from './components/CheckOnlineStatus';

function App() {
  return (
    <>     
      <div className="App">    
        <header className="App-header">      
        <CheckOnlineStatus/>              
          <Routes>
            <Route path="/" element={<LoaderMain />} />
            <Route path="/questions">
              <Route index element={<ListScreen />} />
              <Route path=":id" element={<DetailScreen />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </header>
      </div>      
    </>
  );
}

export default App;
