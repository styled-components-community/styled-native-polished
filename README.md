# styled-native-polished
Styled Components helpers for React Native

## Install
```
yarn add styled-native-polished styled-component
```

## Setup
The recommended approach of usage is using ThemeProvider
```js
// index.js

...
import nativePolished from 'styled-native-polished'
import theme './theme'

<ThemeProvider theme={{ ...nativePolished, ...theme}}>
  <App />
</ThemeProvider>
```

# Helpers
## Media
```js
const ItemDetails = styled.View`
 ${props => props.theme.media({ minWidth: 500 })`
   width: 100%;
 `};
  ${props => props.theme.media({ maxWidth: 500 })`
   width: 60%;
 `};
`
```

## Platform specific styles
```js
const YouExpectedAnElementButItWasMeDioBtn = styled.TouchableOpacity`
 border-color: blue;
 ${props => props.ios`border-color: red`};
`
```
