import { BlurView } from "expo-blur"
import { Ref, forwardRef } from "react"
import { useTheme } from "~/store/theme-store"

type Props = {
  children: React.ReactNode
}

export const TabView = forwardRef(({ children }: Props, ref: Ref<BlurView>) => {
  const theme = useTheme()

  return (
    <BlurView
      ref={ref}
      intensity={100}
      tint={theme}
      experimentalBlurMethod="dimezisBlurView"
      className="-translate-x-1/2 absolute bottom-10 left-1/2 flex-row items-center gap-2 overflow-hidden rounded-full border border-outline-100 p-1"
    >
      {children}
    </BlurView>
  )
})
