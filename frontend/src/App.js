import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './pages/HomePage';
// import Temp2 from './components/temp2';

function App() {
  return (
     <ChakraProvider>
        <HomePage className='overflow-x-hidden'/>
     </ChakraProvider>
  );
}

export default App;
