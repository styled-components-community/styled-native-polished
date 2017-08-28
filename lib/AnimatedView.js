import React from 'react'
import styled, { css } from 'styled-components/native'
import { Animated } from 'react-native'
import AnimatedStateHandlersHoC from './AnimatedStateHandlersHoC'

/*
 * Usage:
  * const AnimatedView = AnimatedStyled`
  *  background-color: #999;
  *  opacity: ${animated('1s')};
  *  width: 300;
  *  height: 300;
  * `
  *
  * ...
  * <AnimatedView opacity={opacityValue} />
  * ...
  * And it will animate any value changes
*/

const FIELD_WIDTH_VALUE_REGEX = /[a-z\-]+:?$/g

export function AnimatedStyled(strings, ...values) {
  const animatedFields = values
    .map((fn, index) => fn.__animated ? createAnimatedFieldDeclaration(strings.raw[index], fn.duration) : null)
    .filter(field => field !== null)

  // Replace animated values with a animated instance getter
  const valuesWithAnimated = values.map((value, index) => value.__animated ? createdAnimatedPropGetter(animatedFields[index].name) : value)

  return AnimatedHoC(
    styled(Animated.View)`
      ${css(strings, ...values)}
    `
  )
}

const createAnimatedFieldDeclaration = (raw, duration) => ({
  duration,
  name: raw.trim().match(FIELD_WIDTH_VALUE_REGEX)[0].replace(':', ''),
})

const createAnimatedPropGetter = animatedFieldName => props => props => props[`_animatedField${animatedFieldName}`]

export function animate(time) {
  return {
    __animated: true,
    duration: time,
  }
}
