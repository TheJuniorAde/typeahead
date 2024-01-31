import React from "react"
import { Text } from "../Text"
import { getListItemStyles } from "../../business/utils"

export interface ListItemProps extends React.PropsWithChildren {
  className?: string
  onClick?: () => void
  selected?: boolean
  style?: React.CSSProperties
  id?: string
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  onClick,
  selected = false,
  style = {},
  children,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={() => onClick?.()}
      className={`list-item ${className} ${selected && "list-item-selected"}`}
      style={style}
      data-testid="typeahead-list-item"
    >
      {children}
    </div>
  )
}

export const SingleListItem: React.FC<{
  label: string
  minItemHeight: number
}> = ({ label, minItemHeight }) => (
  <ListItem
    aria-label={`list item info: ${label}`}
    className="list-item"
    key="typeahead-list-single"
    data-testid="typeahead-single-item"
    style={getListItemStyles(false, minItemHeight)}
  >
    <Text>{label}</Text>
  </ListItem>
)
