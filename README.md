# styled-native-tricks-and-tips
Styled component tricks

## Media-like
```js
// theme.js

import { Dimensions } from 'react-native'
import { css } from 'react-native'
import { some } from 'lodash/fp'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

export default {
  // super simple, does not cover all cases
  media: ({ maxWidth, minWidth }) => (...args) => {
    const conditions = [
      maxWidth && WINDOW_WIDTH < maxWidth,
      minWidth && WINDOW_WIDTH > minWidth,
    ]

    return some(Boolean, conditions) ? css(...args) : {};
  }
}

// usage
const ItemDetails = styled.View`
 ${props => props.theme.media({ minWidth: 500 })`
   width: 100%;
 `};
  ${props => props.theme.media({ maxWidth: 500 })`
   width: 60%;
 `};
`
```

## Platform specific code
```js
import { Platform } from 'react-native'
import styled, { css } from 'styled-components/native'
const Thing = styled.Text`
   font-size: 12;
  ${Platform.select({ ios: css`color: blue`, android: css`color: red` })};
`
```

Or 

```
// theme.js
import { Platform } from 'react-native'

export default {
  ios: (...args) => Platform.select({ ios: css(...args), android: {} }),  
  android: (...args) => Platform.select({ android: css(...args), ios: {} }),
}

// Usage

const ZaWarudoBtn = styled.TouchableOpacity`
 border-color: blue;
 ${props => props.ios`border-color: red`};
`
```
