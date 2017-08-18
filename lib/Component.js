import { compose, withStateHandlers, lifecycle } from 'lodash'
import React from 'react'
import { Animated } from 'react-native'

function AnimatedComponent(props) {
  return <Animated.View {...props} />
}

export default compose(
  withStateHandlers(
    ({ _animatedFields, ...props }) => {
      return _animatedFields.reduce(
        (acc, animatedField) => ({
          ...acc,
          [`_animatedField${animatedField.name}`]: new Animated.Value(
            props[animatedField.name] || 0,
          ),
        }),
        {},
      )
    },
    (state, { _animatedFields, ...props }) => {
      return _animatedFields.reduce(
        (acc, animatedField) => ({
          ...acc,
          [`_setAnimated${animatedField.name}`]: value =>
            Animated.timing(state[`_animatedField${animatedField.name}`], {
              toValue: value,
              duration: animatedField.duration,
            }).start(),
        }),
        {},
      )
    },
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      Object.keys(nextProps).forEach(key => {
        if (this.props._animatedFields.includes(key)) {
          this.props[`_setAnimated${key}`](nextProps[key])
        }
      })
    },
  }),
)
