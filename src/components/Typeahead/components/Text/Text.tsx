import React from "react"

export interface TextProps extends React.PropsWithChildren {
  style?: React.CSSProperties
}

export const Text: React.FC<TextProps> = ({ style, children }) => (
  <span style={style}>{children}</span>
)
