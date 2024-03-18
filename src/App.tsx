import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from '@emotion/styled'
import HotelPage from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import TestPage from '@pages/Test'

function App() {
  return (
    <Wrap>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </Wrap>
  )
}

const Wrap = styled.div`
  max-width: 480px;
  margin: 0 auto;
`

export default App
