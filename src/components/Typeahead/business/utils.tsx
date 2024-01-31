import React from "react"
import DropIconSource from "../assets/drop-icon.svg"
import LoadingIconSource from "../assets/loading-icon.svg"
import ClearIconSource from "../assets/clear-icon.svg"
import {
  TypeaheadDataList,
  TypeaheadSelectedItem,
  TypeaheadSelectedItems,
} from "../types"

export const getCurrentValue = (
  multiple: boolean,
  term: string,
  selectedItems: TypeaheadSelectedItems
) =>
  multiple
    ? term
    : selectedItems
    ? (selectedItems as TypeaheadSelectedItem).label
    : term

export const MenuIcon: React.FC<{ show: boolean }> = ({ show }) => (
  <img
    aria-label={show ? "close menu icon" : "open menu icon"}
    className={`icon-image menu ${show && "showing"}`}
    src={DropIconSource}
    alt="dropdown icon"
  />
)

export const LoadingIcon: React.FC = () => (
  <img
    aria-label="loading content icon"
    className="icon-image loading"
    src={LoadingIconSource}
    alt="loading icon"
  />
)

export const ClearIcon: React.FC = () => (
  <img
    aria-label="clear content icon"
    className="icon-image icon-chip"
    src={ClearIconSource}
    alt="clear content icon"
  />
)

export const getMenuAriaLabel = (show: boolean) =>
  show ? "arrow up/close menu" : "arrow down/open menu"

export const getListItemStyles = (
  isActive: boolean,
  minItemHeight: number
): React.CSSProperties => ({
  backgroundColor: isActive ? "rgba(0, 0, 0, 0.04)" : "#FFFFFF",
  minHeight: minItemHeight,
  lineHeight: `${minItemHeight}px`,
})

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const getVisibility = (show: boolean) => (show ? "visible" : "hidden")

export const getItems = (
  selectedItems: TypeaheadSelectedItems,
  multiple: boolean
) =>
  (multiple
    ? selectedItems || []
    : [selectedItems || { id: -1 }]) as TypeaheadDataList

export const getDropdownStyles = (
  show: boolean,
  inputHeight: number
): React.CSSProperties => ({
  visibility: getVisibility(show),
  top: inputHeight,
})

export const getListStyles = (maxMenuHeight: number): React.CSSProperties => ({
  width: "100%",
  maxHeight: maxMenuHeight,
})
