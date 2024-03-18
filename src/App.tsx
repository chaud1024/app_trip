import styled from '@emotion/styled'
import HotelPage from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import MyPage from '@pages/My'
import SigninPage from '@pages/Signin'
import TestPage from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthGuard from '@components/auth/AuthGuard'
import useLoadKakao from '@hooks/useLoadKakao'
import NavBar from '@shared/NavBar'

function App() {
  useLoadKakao()
  return (
    <Wrap>
      <BrowserRouter>
        <AuthGuard>
          <NavBar />
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </Wrap>
  )
}

const Wrap = styled.div`
  max-width: 480px;
  margin: 0 auto;
`

export default App
