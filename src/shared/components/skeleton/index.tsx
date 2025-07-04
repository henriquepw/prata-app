import type { VariantProps } from "@gluestack-ui/nativewind-utils"
import type React from "react"
import { forwardRef } from "react"
import { Animated, Easing, Platform, View } from "react-native"
import { skeletonStyle, skeletonTextStyle } from "./styles"

type ISkeletonProps = React.ComponentProps<typeof View> &
  VariantProps<typeof skeletonStyle> & {
    isLoaded?: boolean
    startColor?: string
  }

type ISkeletonTextProps = React.ComponentProps<typeof View> &
  VariantProps<typeof skeletonTextStyle> & {
    _lines?: number
    isLoaded?: boolean
    startColor?: string
  }

const Skeleton = forwardRef<
  React.ComponentRef<typeof Animated.View>,
  ISkeletonProps
>(function Skeleton(
  {
    className,
    variant,
    children,
    startColor = "bg-background-200",
    isLoaded = false,
    speed = 2,
    ...props
  },
  ref,
) {
  const pulseAnim = new Animated.Value(1)
  const customTimingFunction = Easing.bezier(0.4, 0, 0.6, 1)
  const fadeDuration = 0.6
  const animationDuration = (fadeDuration * 10000) / speed // Convert seconds to milliseconds

  const pulse = Animated.sequence([
    Animated.timing(pulseAnim, {
      toValue: 1, // Start with opacity 1
      duration: animationDuration / 2, // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web",
    }),
    Animated.timing(pulseAnim, {
      toValue: 0.75,
      duration: animationDuration / 2, // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web",
    }),
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: animationDuration / 2, // Third of the animation duration
      easing: customTimingFunction,
      useNativeDriver: Platform.OS !== "web",
    }),
  ])

  if (!isLoaded) {
    Animated.loop(pulse).start()
    return (
      <Animated.View
        className={`${startColor} ${skeletonStyle({
          variant,
          class: className,
        })}`}
        style={{ opacity: pulseAnim }}
        {...props}
        ref={ref}
      />
    )
  }
  Animated.loop(pulse).stop()

  return children
})

const SkeletonText = forwardRef<
  React.ComponentRef<typeof View>,
  ISkeletonTextProps
>(function SkeletonText(
  {
    className,
    _lines,
    isLoaded = false,
    startColor = "bg-background-200",
    gap = 2,
    children,
    ...props
  },
  ref,
) {
  if (!isLoaded) {
    if (_lines) {
      return (
        <View
          className={`${skeletonTextStyle({
            gap,
          })}`}
          ref={ref}
        >
          {Array.from({ length: _lines }).map((_, index) => (
            <Skeleton
              className={`${startColor} ${skeletonTextStyle({
                class: className,
              })}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: it's ok
              key={index}
              {...props}
            />
          ))}
        </View>
      )
    }
    return (
      <Skeleton
        className={`${startColor} ${skeletonTextStyle({
          class: className,
        })}`}
        {...props}
        ref={ref}
      />
    )
  }
  return children
})

Skeleton.displayName = "Skeleton"
SkeletonText.displayName = "SkeletonText"

export { Skeleton, SkeletonText }
