import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import { createPortal } from 'react-dom'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }
  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        full={true}
        onClick={onClick}
        css={buttonStyle}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
    to {
        transform: translateY(0);
    }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`

const buttonStyle = css`
  border-radius: 8px;
  max-width: 480px;
  margin: 0 auto;
`

export default FixedBottomButton
