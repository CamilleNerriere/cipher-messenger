import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Components/Home/Home.tsx";
import SignIn from "./Components/SignIn/SignIn.tsx"


function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
