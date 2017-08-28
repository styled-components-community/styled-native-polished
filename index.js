import { Dimensions, Platform } from 'react-native'
import { css } from 'styled-components/native'
import some from 'lodash.some'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

export const media = ({ maxWidth, minWidth }) => (...args) => {
  const conditions = [
    maxWidth && WINDOW_WIDTH < maxWidth,
    minWidth && WINDOW_WIDTH > minWidth,
  ]

  return some(conditions, Boolean) ? css(...args) : {}
}

export const ios = (...args) => Platform.select({ ios: css(...args), android: {} })

export const android = (...args) => Platform.select({ android: css(...args), ios: {} })

export const fullAlign = () => css`
  align-items: center;
  justify-content: center;
`

export const roundedWrapper = size => css`
  align-items: center;
  justify-content: center;
  height: ${size};
  width: ${size};
  border-radius: ${size / 2};
`
