"use client"
import { vars } from "nativewind"

const _BLUE = [
  "240 253 250",
  "204 251 241",
  "153 246 228",
  "94 234 212",
  "45 212 191",
  "20 184 166",
  "13 148 136",
  "15 118 110",
  "17 94 89",
  "19 78 74",
  "4 47 46",
]

const _ORANGE = [
  "255 215 159",
  "255 198 119",
  "255 182 80",
  "255 165 40",
  "255 147 0",
  "225 134 7",
  "195 119 12",
  "168 105 17",
  "142 91 19",
  "117 77 21",
]

export const PRIMARY_COLOR = _BLUE

function getAccentColor(theme: "light" | "dark", color: string) {
  if (theme === "light") {
    return {
      [`--color-${color}-50`]: PRIMARY_COLOR[0],
      [`--color-${color}-100`]: PRIMARY_COLOR[1],
      [`--color-${color}-200`]: PRIMARY_COLOR[2],
      [`--color-${color}-300`]: PRIMARY_COLOR[3],
      [`--color-${color}-400`]: PRIMARY_COLOR[4],
      [`--color-${color}-500`]: PRIMARY_COLOR[5],
      [`--color-${color}-600`]: PRIMARY_COLOR[6],
      [`--color-${color}-700`]: PRIMARY_COLOR[7],
      [`--color-${color}-800`]: PRIMARY_COLOR[8],
      [`--color-${color}-900`]: PRIMARY_COLOR[9],
      [`--color-${color}-950`]: PRIMARY_COLOR[10],
    } as const
  }

  return {
    [`--color-${color}-50`]: PRIMARY_COLOR[10],
    [`--color-${color}-100`]: PRIMARY_COLOR[9],
    [`--color-${color}-200`]: PRIMARY_COLOR[8],
    [`--color-${color}-300`]: PRIMARY_COLOR[7],
    [`--color-${color}-400`]: PRIMARY_COLOR[6],
    [`--color-${color}-500`]: PRIMARY_COLOR[5],
    [`--color-${color}-600`]: PRIMARY_COLOR[4],
    [`--color-${color}-700`]: PRIMARY_COLOR[3],
    [`--color-${color}-800`]: PRIMARY_COLOR[2],
    [`--color-${color}-900`]: PRIMARY_COLOR[1],
    [`--color-${color}-950`]: PRIMARY_COLOR[0],
  } as const
}

// function getNeutralColor(theme: "light" | "dark", color: string) {
//   if (theme === "light") {
//     return {
//       [`--color-${color}-50`]: "250 250 250",
//       [`--color-${color}-100`]: "244 244 245",
//       [`--color-${color}-200`]: "228 228 231",
//       [`--color-${color}-300`]: "212 212 216",
//       [`--color-${color}-400`]: "161 161 170",
//       [`--color-${color}-500`]: "113 113 122",
//       [`--color-${color}-600`]: "82 82 91",
//       [`--color-${color}-700`]: "63 63 70",
//       [`--color-${color}-800`]: "39 39 42",
//       [`--color-${color}-900`]: "24 24 27",
//       [`--color-${color}-950`]: "9 9 11",
//     } as const
//   }
//
//   return {
//     [`--color-${color}-50`]: "9 9 11",
//     [`--color-${color}-100`]: "24 24 27",
//     [`--color-${color}-200`]: "39 39 42",
//     [`--color-${color}-300`]: "63 63 70",
//     [`--color-${color}-400`]: "82 82 91",
//     [`--color-${color}-500`]: "113 113 122",
//     [`--color-${color}-600`]: "161 161 170",
//     [`--color-${color}-700`]: "212 212 216",
//     [`--color-${color}-800`]: "228 228 231",
//     [`--color-${color}-900`]: "244 244 245",
//     [`--color-${color}-950`]: "250 250 250",
//   } as const
// }

export const config = {
  light: vars({
    ...getAccentColor("light", "primary"),
    ...getAccentColor("light", "secondary"),
    ...getAccentColor("light", "tertiary"),

    // ...getNeutralColor("light", "background"),
    // ...getNeutralColor("light", "neutral"),

    // /* Typography */
    "--color-typography-0": "254 254 255",
    "--color-typography-50": "245 245 245",
    "--color-typography-100": "229 229 229",
    "--color-typography-200": "219 219 220",
    "--color-typography-300": "212 212 212",
    "--color-typography-400": "163 163 163",
    "--color-typography-500": "140 140 140",
    "--color-typography-600": "115 115 115",
    "--color-typography-700": "82 82 82",
    "--color-typography-800": "64 64 64",
    "--color-typography-900": "38 38 39",
    "--color-typography-950": "23 23 23",

    /* Outline */
    "--color-outline-0": "253 254 254",
    "--color-outline-50": "243 243 243",
    "--color-outline-100": "230 230 230",
    "--color-outline-200": "221 220 219",
    "--color-outline-300": "211 211 211",
    "--color-outline-400": "165 163 163",
    "--color-outline-500": "140 141 141",
    "--color-outline-600": "115 116 116",
    "--color-outline-700": "83 82 82",
    "--color-outline-800": "65 65 65",
    "--color-outline-900": "39 38 36",
    "--color-outline-950": "26 23 23",

    /* Background */
    "--color-background-0": "255 255 255",
    "--color-background-50": "246 246 246",
    "--color-background-100": "242 241 241",
    "--color-background-200": "220 219 219",
    "--color-background-300": "213 212 212",
    "--color-background-400": "162 163 163",
    "--color-background-500": "142 142 142",
    "--color-background-600": "116 116 116",
    "--color-background-700": "83 82 82",
    "--color-background-800": "65 64 64",
    "--color-background-900": "39 38 37",
    "--color-background-950": "18 18 18",

    /* Error */
    "--color-error-0": "254 233 233",
    "--color-error-50": "254 226 226",
    "--color-error-100": "254 202 202",
    "--color-error-200": "252 165 165",
    "--color-error-300": "248 113 113",
    "--color-error-400": "239 68 68",
    "--color-error-500": "230 53 53",
    "--color-error-600": "220 38 38",
    "--color-error-700": "185 28 28",
    "--color-error-800": "153 27 27",
    "--color-error-900": "127 29 29",
    "--color-error-950": "83 19 19",

    /* Success */
    "--color-success-0": "228 255 244",
    "--color-success-50": "202 255 232",
    "--color-success-100": "162 241 192",
    "--color-success-200": "132 211 162",
    "--color-success-300": "102 181 132",
    "--color-success-400": "72 151 102",
    "--color-success-500": "52 131 82",
    "--color-success-600": "42 121 72",
    "--color-success-700": "32 111 62",
    "--color-success-800": "22 101 52",
    "--color-success-900": "20 83 45",
    "--color-success-950": "27 50 36",

    /* Warning */
    "--color-warning-0": "255 249 245",
    "--color-warning-50": "255 244 236",
    "--color-warning-100": "255 231 213",
    "--color-warning-200": "254 205 170",
    "--color-warning-300": "253 173 116",
    "--color-warning-400": "251 149 75",
    "--color-warning-500": "231 120 40",
    "--color-warning-600": "215 108 31",
    "--color-warning-700": "180 90 26",
    "--color-warning-800": "130 68 23",
    "--color-warning-900": "108 56 19",
    "--color-warning-950": "84 45 18",

    /* Info */
    "--color-info-0": "236 248 254",
    "--color-info-50": "199 235 252",
    "--color-info-100": "162 221 250",
    "--color-info-200": "124 207 248",
    "--color-info-300": "87 194 246",
    "--color-info-400": "50 180 244",
    "--color-info-500": "13 166 242",
    "--color-info-600": "11 141 205",
    "--color-info-700": "9 115 168",
    "--color-info-800": "7 90 131",
    "--color-info-900": "5 64 93",
    "--color-info-950": "3 38 56",

    /* Background Special */
    "--color-background-error": "254 241 241",
    "--color-background-warning": "255 243 234",
    "--color-background-success": "237 252 242",
    "--color-background-muted": "247 248 247",
    "--color-background-info": "235 248 254",

    /* Focus Ring Indicator  */
    "--color-indicator-primary": "55 55 55",
    "--color-indicator-info": "83 153 236",
    "--color-indicator-error": "185 28 28",
  }),
  dark: vars({
    ...getAccentColor("dark", "primary"),
    ...getAccentColor("dark", "secondary"),
    ...getAccentColor("dark", "tertiary"),

    // ...getNeutralColor("dark", "background"),
    // ...getNeutralColor("dark", "neutral"),

    /* Typography */
    "--color-typography-0": "23 23 23",
    "--color-typography-50": "38 38 39",
    "--color-typography-100": "64 64 64",
    "--color-typography-200": "82 82 82",
    "--color-typography-300": "115 115 115",
    "--color-typography-400": "140 140 140",
    "--color-typography-500": "163 163 163",
    "--color-typography-600": "212 212 212",
    "--color-typography-700": "219 219 220",
    "--color-typography-800": "229 229 229",
    "--color-typography-900": "245 245 245",
    "--color-typography-950": "254 254 255",

    /* Outline */
    "--color-outline-0": "26 23 23",
    "--color-outline-50": "39 38 36",
    "--color-outline-100": "65 65 65",
    "--color-outline-200": "83 82 82",
    "--color-outline-300": "115 116 116",
    "--color-outline-400": "140 141 141",
    "--color-outline-500": "165 163 163",
    "--color-outline-600": "211 211 211",
    "--color-outline-700": "221 220 219",
    "--color-outline-800": "230 230 230",
    "--color-outline-900": "243 243 243",
    "--color-outline-950": "253 254 254",

    /* Background */
    "--color-background-0": "18 18 18",
    "--color-background-50": "39 38 37",
    "--color-background-100": "65 64 64",
    "--color-background-200": "83 82 82",
    "--color-background-300": "116 116 116",
    "--color-background-400": "142 142 142",
    "--color-background-500": "162 163 163",
    "--color-background-600": "213 212 212",
    "--color-background-700": "229 228 228",
    "--color-background-800": "242 241 241",
    "--color-background-900": "246 246 246",
    "--color-background-950": "255 255 255",

    /* Error */
    "--color-error-0": "83 19 19",
    "--color-error-50": "127 29 29",
    "--color-error-100": "153 27 27",
    "--color-error-200": "185 28 28",
    "--color-error-300": "220 38 38",
    "--color-error-400": "230 53 53",
    "--color-error-500": "239 68 68",
    "--color-error-600": "249 97 96",
    "--color-error-700": "229 91 90",
    "--color-error-800": "254 202 202",
    "--color-error-900": "254 226 226",
    "--color-error-950": "254 233 233",

    /* Success */
    "--color-success-0": "27 50 36",
    "--color-success-50": "20 83 45",
    "--color-success-100": "22 101 52",
    "--color-success-200": "32 111 62",
    "--color-success-300": "42 121 72",
    "--color-success-400": "52 131 82",
    "--color-success-500": "72 151 102",
    "--color-success-600": "102 181 132",
    "--color-success-700": "132 211 162",
    "--color-success-800": "162 241 192",
    "--color-success-900": "202 255 232",
    "--color-success-950": "228 255 244",

    /* Warning */
    "--color-warning-0": "84 45 18",
    "--color-warning-50": "108 56 19",
    "--color-warning-100": "130 68 23",
    "--color-warning-200": "180 90 26",
    "--color-warning-300": "215 108 31",
    "--color-warning-400": "231 120 40",
    "--color-warning-500": "251 149 75",
    "--color-warning-600": "253 173 116",
    "--color-warning-700": "254 205 170",
    "--color-warning-800": "255 231 213",
    "--color-warning-900": "255 244 237",
    "--color-warning-950": "255 249 245",

    /* Info */
    "--color-info-0": "3 38 56",
    "--color-info-50": "5 64 93",
    "--color-info-100": "7 90 131",
    "--color-info-200": "9 115 168",
    "--color-info-300": "11 141 205",
    "--color-info-400": "13 166 242",
    "--color-info-500": "50 180 244",
    "--color-info-600": "87 194 246",
    "--color-info-700": "124 207 248",
    "--color-info-800": "162 221 250",
    "--color-info-900": "199 235 252",
    "--color-info-950": "236 248 254",

    /* Background Special */
    "--color-background-error": "66 43 43",
    "--color-background-warning": "65 47 35",
    "--color-background-success": "28 43 33",
    "--color-background-muted": "51 51 51",
    "--color-background-info": "26 40 46",

    /* Focus Ring Indicator  */
    "--color-indicator-primary": "247 247 247",
    "--color-indicator-info": "161 199 245",
    "--color-indicator-error": "232 70 69",
  }),
}
