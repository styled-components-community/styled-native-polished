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
## Media
```js
import { media } from 'styled-native-polished'

const ItemDetails = styled.View`
 ${props => media({ minWidth: 500 })`
   width: 100%;
 `};
  ${props => media({ maxWidth: 500 })`
   width: 60%;
 `};
`
```

## Platform specific styles
```js
import { ios } from 'styled-native-polished'

const YouExpectedAnElementButItWasMeDioBtn = styled.TouchableOpacity`
 border-color: blue;
 ${props => ios`border-color: red`};
`
```
