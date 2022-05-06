import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';

function App(props) {
  if (props.hats === undefined && props.shoes === undefined) {
    return null;
  }
 
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats" element={<HatsList hats={props.hats} />} /> 
          <Route path="shoes">
            <Route index element={<ShoesList shoes={props.shoes} />} />
            <Route path="new" element={<ShoeForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
