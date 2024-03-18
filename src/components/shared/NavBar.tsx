import { css } from '@emotion/react'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import useUser from '@hooks/auth/useUser'
import { colors } from '@styles/colorPalette'
import Button from './Button'
import Flex from './Flex'

const NavBar = () => {
  const location = useLocation()
  const showSignButton =
    ['/signup', 'signin'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <img
            src={
              user.photoURL ??
              'https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/circle-user-64.png'
            }
            alt="유저사진"
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
          />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex align="center" justify="space-between" css={navbarContainerStyles}>
      <Link to="/">App_Trip</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`

export default NavBar
