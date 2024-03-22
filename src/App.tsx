import styled from '@emotion/styled'
import HotelPage from '@pages/Hotel'
import HotelList from '@pages/HotelList'
import MyPage from '@pages/My'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'
import SigninPage from '@pages/Signin'
import TestPage from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from '@components/auth/PrivateRoute'
import useLoadKakao from '@hooks/useLoadKakao'
import ReservationPage from '@pages/Reservation'
import ReservationDonePage from '@pages/ReservationDone'
import SchedulePage from '@pages/Schedule'
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
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path="/signin" element={<SigninPage />} />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings/like"
              element={
                <PrivateRoute>
                  <LikePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <PrivateRoute>
                  <SchedulePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation"
              element={
                <PrivateRoute>
                  <ReservationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reservation/done"
              element={
                <PrivateRoute>
                  <ReservationDonePage />
                </PrivateRoute>
              }
            />
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
  position: relative;
`

export default App
