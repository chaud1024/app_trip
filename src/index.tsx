import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: pink;
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
    <Container>
      <h2
        css={css`
          color: crimson;
          text-align: center;
          padding: 2rem 0;
        `}
      >
        hello!
      </h2>
    </Container>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
