import React from "react"

export interface ListItemProps extends React.PropsWithChildren {
  className?: string
  onClick?: () => void
  selected?: boolean
  style?: React.CSSProperties
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  onClick,
  selected = false,
  style = {},
  children,
}) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={`list-item ${className} ${selected && "list-item-selected"}`}
      style={style}
    >
      {children}
    </div>
  )
}
