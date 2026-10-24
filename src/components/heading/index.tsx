import {
  H1 as H1Base,
  H2 as H2Base,
  H3 as H3Base,
  H4 as H4Base,
  H5 as H5Base,
  H6 as H6Base,
} from "@expo/html-elements"
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils"
import type React from "react"
import { forwardRef, memo } from "react"
import { withUniwind } from "uniwind"
import { headingStyle } from "./styles"

export type HeadingProps = VariantProps<typeof headingStyle> &
  React.ComponentPropsWithoutRef<typeof H1Base> & {
    as?: React.ElementType
  }

const H1 = withUniwind(H1Base)
const H2 = withUniwind(H2Base)
const H3 = withUniwind(H3Base)
const H4 = withUniwind(H4Base)
const H5 = withUniwind(H5Base)
const H6 = withUniwind(H6Base)

const MappedHeading = memo(
  forwardRef<React.ComponentRef<typeof H1>, HeadingProps>(
    (
      {
        size,
        className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        ...props
      },
      ref,
    ) => {
      switch (size) {
        case "5xl":
        case "4xl":
        case "3xl":
          return (
            <H1
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        case "2xl":
          return (
            <H2
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        case "xl":
          return (
            <H3
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        case "lg":
          return (
            <H4
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        case "md":
          return (
            <H5
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        case "sm":
        case "xs":
          return (
            <H6
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
        default:
          return (
            <H4
              className={headingStyle({
                size,
                isTruncated,
                bold,
                underline,
                strikeThrough,
                sub,
                italic,
                highlight,
                class: className,
              })}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          )
      }
    },
  ),
)

const Heading = memo(
  forwardRef<React.ComponentRef<typeof H1>, HeadingProps>(
    ({ className, size = "lg", as: AsComp, ...props }, ref) => {
      const {
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
      } = props

      if (AsComp) {
        return (
          <AsComp
            className={headingStyle({
              size,
              isTruncated,
              bold,
              underline,
              strikeThrough,
              sub,
              italic,
              highlight,
              class: className,
            })}
            {...props}
          />
        )
      }

      return (
        <MappedHeading className={className} ref={ref} size={size} {...props} />
      )
    },
  ),
)

Heading.displayName = "Heading"

export { Heading }
