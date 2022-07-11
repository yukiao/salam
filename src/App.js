import {Container, Text, MantineProvider} from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import New from './screens/New';
import Cards from './screens/Cards'
import CardList from './screens/CardList';

const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Montserrat, sans-serif',
        headings: {
          fontFamily: "Montserrat"
        }
      }}
    >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="new" element={<New />} />
        <Route path="cards/:id" element={<Cards />} />
        <Route path='list' element={<CardList />} />
      </Routes>
    </BrowserRouter>   
    </MantineProvider>
  )
}

export default App;
