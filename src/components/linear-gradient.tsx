import { tva } from "@gluestack-ui/utils/nativewind-utils"
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient"
import React from "react"
import { withUniwind } from "uniwind"

const StyledLinearGradient = withUniwind(ExpoLinearGradient)

const linearGradientStyle = tva({
  base: "",
})

export const LinearGradient = React.forwardRef(
  ({ className, ...props }: any, ref?: any) => {
    return (
      <StyledLinearGradient
        {...props}
        className={linearGradientStyle({ class: className })}
        ref={ref}
      />
    )
  },
)
