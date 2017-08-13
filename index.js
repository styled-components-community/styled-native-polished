import { Dimensions, Platform } from 'react-native'
import { css } from 'react-native'
import some from 'lodash.some'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

export default {
  media: ({ maxWidth, minWidth }) => (...args) => {
    const conditions = [
      maxWidth && WINDOW_WIDTH < maxWidth,
      minWidth && WINDOW_WIDTH > minWidth,
    ]

    return some(conditions, Boolean) ? css(...args) : {}
  },
  ios: (...args) => Platform.select({ ios: css(...args), android: {} }),
  android: (...args) => Platform.select({ android: css(...args), ios: {} }),
}
