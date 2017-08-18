import React from 'react'
import styled, { css } from 'styled-components/native'
import { Animated } from 'react-native'
import AnimatedStateHandlersHoC from './AnimatedStateHandlersHoC'

/*
 * Usage:
  * const AnimatedView = AnimatedStyled`
  *  background-color: #999;
  *  opacity: ${animated(1000)};
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
    .map((fn, index) => fn.__animated ? {raw: strings.raw[index], duration: fn.duration} : null)
    .filter(field => field !== null)
    .map(field => (
      ...field,
      name: field.raw.trim().match(FIELD_WIDTH_VALUE_REGEX)[0].replace(':', ''),
    ))

  const valuesWithAnimated = values.map((value, index) => value.__animated ? props => props[`_animatedField${animatedFields[index]}`] : value)

  return AnimatedHoC(
    styled(Animated.View)`
      ${css(strings, ...values)}
    `
  )
}

export function animate(time) {
  return {
    __animated: true,
    duration: time,
  }
}
