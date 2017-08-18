import { compose, withStateHandlers, lifecycle } from 'lodash'
import { Animated } from 'react-native'

export default compose(
  withStateHandlers(
    ({ _animatedFields, ...props }) => {
      return _animatedFields.reduce(
        (acc, animatedField) => ({
          ...acc,
          ...createAnimatedProp(animatedField.name, props[animatedField.name]),
        }),
        {},
      )
    },
    (state, { _animatedFields, ...props }) => {
      return _animatedFields.reduce(
        (acc, animatedField) => ({
          ...acc,
          ...createAnimatedSetter(animatedField),
        }),
        {},
      )
    },
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      Object.keys(nextProps).forEach(key => {
        if (this.props._animatedFields.includes(key)) {
          this.props[getAnimatedSetterKey({key})](nextProps[key])
        }
      })
    },
  }),
)

function createAnimatedProp(name, initialValue = 0) {
  return {
    [getAnimatedGetterKey(animatedField.name)]: new Animated.Value(initialValue),
  }
}

function createAnimatedSetter(animatedDefinition) {
  return {
    [getAnimatedSetterKey(${animatedField.name})]: value =>
      Animated.timing(state[getAnimatedGetterKey(animatedField.name)], {
        toValue: value,
        duration: animatedField.duration,
      }).start(),
  }
}

function getAnimatedSetterKey(name) {
  return `_setAnimated${name}`
}

function getAnimatedGetterKey(name) {
  return `_animatedField${name}`
}
