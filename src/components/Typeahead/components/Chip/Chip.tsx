import React from "react"
import { Text } from "../Text"
import { ClearIcon } from "../../business/utils"

import "./Chip.css"

export interface ChipProps {
  label: string | number
  onDelete: () => void
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  ...otherProps
}) => (
  <div className="chip-root" style={{ marginLeft: 4 }} {...otherProps}>
    <Text>{label}</Text>
    <button className="icon-button" onClick={onDelete}>
      <ClearIcon />
    </button>
  </div>
)
