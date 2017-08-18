import { compose, withStateHandlers, lifecycle } from 'lodash'
import { Animated } from 'react-native'

export default compose(
  withStateHandlers(
    ({ _animatedFields, ...props }) => {
      return _animatedFields.reduce(
        (acc, animatedField) => ({
          ...acc,
          [`_${animatedField.name}`]: new Animated.Value(
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
            Animated.timing(state[`_${animatedField.name}`], {
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
