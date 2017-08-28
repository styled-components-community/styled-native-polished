# styled-native-polished
Styled Components helpers for React Native

## Install
```
yarn add styled-native-polished styled-component
```

## Setup
You provide all the methods using the theme provider
```js
// index.js

...
import * as nativePolished from 'styled-native-polished'
import theme './theme'

<ThemeProvider theme={{ ...nativePolished, ...theme}}>
  <App />
</ThemeProvider>
```

Or import as necessary with the named imports
```
import { ios } from 'styled-native-polished'
```

# Helpers
## media
```js
import { media } from 'styled-native-polished'

const ItemDetails = styled.View`
 ${media({ minWidth: 500 })`
   width: 100%;
 `};
  ${media({ maxWidth: 500 })`
   width: 60%;
 `};
`
```

## ios
iOS specific styles
```js
import { ios } from 'styled-native-polished'

const YouExpectedAnElementButItWasMeDioBtn = styled.TouchableOpacity`
 border-color: blue;
 ${ios`border-color: red`};
`
```

## android
Android specific styles
```js
import { android } from 'styled-native-polished'

const YouExpectedAnElementButItWasMeDioBtn = styled.TouchableOpacity`
 border-color: blue;
 ${android`border-color: red`};
`
```

## fullAlign
Flex full centralize parent items
```js
import { fullAlign } from 'styled-native-polished'

const Wrapper = styled.View`
 border-color: blue;
 ${fullAlign()};
`
```

## roundedWrapper(size)
Helps to create a completely rounded view
```js
import { roundedWrapper } from 'styled-native-polished'

const RoundedButton = styled.TouchableOpacity`
 border-color: blue;
 ${roundedWrapper('40px')};
`
```
