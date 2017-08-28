/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Animated } from 'react-native'
import styled from 'styled-components/native'
import { compose, withStateHandlers } from 'recompose'

const AnimView = styled(Animated.View)`
  width: 200;
  height: ${props => props.height};
  background-color: red;
`

class Example extends Component {
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>hello</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default compose(
  withStateHandlers(() =>
    ({
      height: new Animated.Value(150),
    }),
    {
      changeOpacity: ({ height }) => () =>
        Animated.spring(height, { toValue: 300 }).start(),
    },
  ),
)(Example)

AppRegistry.registerComponent('Example', () => Example)
