import React, { useContext } from "react"
import { TypeaheadContext } from "../../Typeahead"
import { TypeaheadDataListItem, TypeaheadSelectedItemsList } from "../../types"

import {
  ClearIcon,
  getMenuAriaLabel,
  LoadingIcon,
  MenuIcon,
} from "../../business/utils"
import { Chip } from "../Chip"

/**
 * The adornment for the `multiple` typeahead
 */
export const InputStartAdornment: React.FC = () => {
  const { multiple, selectedItems, onRemoveItem } = useContext(TypeaheadContext)

  if (!multiple) {
    return null
  }

  return (
    <>
      {((selectedItems as TypeaheadSelectedItemsList) || []).map((item) => (
        <Chip
          key={`typeahead-input-chip-selected-${item.id}`}
          label={item.label}
          onDelete={() => onRemoveItem(item)}
          data-testid="typeahead-selected-item"
        />
      ))}
    </>
  )
}

/**
 * The adornment for the actions in the typeahead component.
 * It can be a loading spinner, a CLEAR action and a menu/toggle action
 */
export const InputEndAdornment: React.FC = () => {
  const { loading, ...otherProps } = useContext(TypeaheadContext)

  if (loading) {
    return (
      <button
        className="icon-button"
        data-testid="typeahead-loading"
        aria-label="loading"
        disabled
      >
        <LoadingIcon />
      </button>
    )
  }

  const { multiple, selectedItems, onRemoveItem, showMenu, show } = otherProps

  return !multiple ? (
    <button
      className="icon-button"
      aria-label="clear"
      onClick={(event) => {
        event.stopPropagation()
        !!selectedItems && onRemoveItem(selectedItems as TypeaheadDataListItem)
      }}
      disabled={!selectedItems}
      data-testid="typeahead-clear-input"
    >
      <ClearIcon />
    </button>
  ) : (
    <button
      className="icon-button"
      aria-label={getMenuAriaLabel(show)}
      onClick={(event) => {
        event.stopPropagation()
        showMenu(!show)
      }}
      data-testid="typeahead-toggle-menu"
    >
      <MenuIcon show={show} />
    </button>
  )
}
