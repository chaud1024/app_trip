import styled from '@emotion/styled'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthGuard from '@components/auth/AuthGuard'
import useLoadKakao from '@hooks/useLoadKakao'
import NavBar from '@shared/NavBar'

const PrivateRoute = lazy(() => import('@components/auth/PrivateRoute'))
const TestPage = lazy(() => import('@pages/Test'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const HotelList = lazy(() => import('@pages/HotelList'))
const MyPage = lazy(() => import('@pages/My'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const SettingsPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/like'))
const SigninPage = lazy(() => import('@pages/Signin'))

function App() {
  useLoadKakao()
  return (
    <Wrap>
      <Suspense fallback={<></>}>
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
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </AuthGuard>
        </BrowserRouter>
      </Suspense>
    </Wrap>
  )
}

const Wrap = styled.div`
  max-width: 480px;
  margin: 0 auto;
  position: relative;
`

export default App
