"use client"
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator"
import { ToastProvider } from "@gluestack-ui/core/toast/creator"
import React, { useEffect, useLayoutEffect } from "react"
import { Uniwind } from "uniwind"
import { script } from "./script"

export const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export function GluestackUIProvider({
  mode = "light",
  ...props
}: {
  mode?: "light" | "dark" | "system"
  children?: React.ReactNode
}) {
  const handleMediaQuery = React.useCallback((e: MediaQueryListEvent) => {
    const resolvedMode = e.matches ? "dark" : "light"
    script(resolvedMode)
    Uniwind.setTheme(resolvedMode)
  }, [])

  useSafeLayoutEffect(() => {
    if (mode === "system") return
    script(mode)
    Uniwind.setTheme(mode)
  }, [mode])

  useSafeLayoutEffect(() => {
    if (mode !== "system") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addListener(handleMediaQuery)

    return () => media.removeListener(handleMediaQuery)
  }, [handleMediaQuery, mode])

  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: requied by gluestack
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})('${mode}')`,
        }}
        suppressHydrationWarning
      />
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  )
}
