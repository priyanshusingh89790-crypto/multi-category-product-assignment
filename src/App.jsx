import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemname" element={<ItemDetail />} />
      </Routes>
    </>
  )
}

export default App
