import React, {
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { TypeaheadContext } from "../../Typeahead"
import { TypeaheadDataList, TypeaheadDataListItem } from "../../types"
import { DropdownListItem } from "./DropdownListItem"
import {
  getItems,
  getDropdownStyles,
  getListStyles,
  clamp,
} from "../../business/utils"
import { List } from "../List"

import "./DropdownList.css"

/**
 * The pop-up list component
 */
export const DropdownList: React.FC = () => {
  const {
    data,
    activeItem,
    onClick,
    selectedItems,
    multiple,
    show,
    inputHeight,
    loading,
    maxMenuHeight,
    minItemHeight,
    menuLabels,
  } = useContext(TypeaheadContext)

  const listRef = useRef<any>(null)
  const listHeightRef = useRef<number>(320)

  const [mustResize, setMustResize] = useState(false)

  const checkIfSelected = useCallback(
    (item: TypeaheadDataListItem) => {
      const currentData: TypeaheadDataList = getItems(selectedItems, multiple)

      return (
        currentData
          .filter((dataItem) => dataItem && dataItem.id !== -1)
          .findIndex((dataItem) => dataItem.id === item.id) !== -1
      )
    },
    [selectedItems, multiple]
  )

  const getCount = useCallback(() => {
    if (loading || data.length === 0) {
      return 1
    }

    return data.length
  }, [loading, data])

  const renderRow = (index: number) => (
    <DropdownListItem
      index={index}
      data={data}
      activeItem={activeItem}
      loading={loading}
      onClick={onClick}
      checkIfSelected={checkIfSelected}
      menuLabels={menuLabels}
      key={`list-item-${index}`}
      minItemHeight={minItemHeight}
    />
  )

  // when the current active item is changed (through keyDown events), we must scroll the virtualized list to show it to the screen
  useEffect(() => {
    listRef.current.scrollIntoView({
      index: activeItem,
      behavior: "auto",
    })
  }, [activeItem])

  // size calculations happens very fast, and sometimes the component does not re-render the resized list properly. So, we force it to
  useLayoutEffect(() => {
    mustResize && setMustResize(!mustResize)
  }, [mustResize])

  return (
    <div
      className="dropdown-list-root"
      style={getDropdownStyles(show, inputHeight, listHeightRef.current)}
    >
      <div
        className="dropdown-list-container"
        style={{ maxHeight: maxMenuHeight }}
      >
        <List
          style={getListStyles(listHeightRef.current, maxMenuHeight)}
          count={getCount()}
          renderRow={renderRow}
          ref={listRef}
        />
      </div>
    </div>
  )
}
