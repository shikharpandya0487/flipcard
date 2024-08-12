import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
// import Temp2 from './components/temp2';
import Authentication from './pages/Authentication.jsx'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth" element={<Authentication/>}/> 
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
