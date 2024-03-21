import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 10 16px;
  font-size: 15px;
  width: 100%;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
