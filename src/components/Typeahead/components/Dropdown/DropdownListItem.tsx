import React from "react"
import { ListItem } from "../List"
import { Text } from "../Text"
import { ItemProps } from "../../types"
import { getListItemStyles } from "../../business/utils"

const SingleItem: React.FC<{ label: string }> = ({ label }) => (
  <ListItem
    aria-label={`list item info: ${label}`}
    className="list-item"
    key="typeahead-list-single"
    data-testid="typeahead-single-item"
  >
    <Text>{label}</Text>
  </ListItem>
)

/**
 * The List item for the pop-up list. As this component can be called multiple times at once
 * (and given the fact that it can be rendered again if it goes back to the viewport) we memoize it!
 * @param {ItemProps} props
 */
export const DropdownListItem = React.memo(
  ({
    index,
    data,
    activeItem,
    loading,
    onClick,
    checkIfSelected,
    menuLabels,
    minItemHeight,
  }: ItemProps) => {
    const item = data[index]
    const isSelected = checkIfSelected(item)

    return (
      <>
        {loading && <SingleItem label={menuLabels.fetchingResults} />}
        {data.length === 0 && !loading && (
          <SingleItem label={menuLabels.noResultsFound} />
        )}
        {!loading && !!item && (
          <ListItem
            aria-label={`list item option: ${item.label}`}
            className="list-item"
            onClick={() => onClick(item)}
            selected={isSelected}
            key={`typeahead-list-item-${item.id}`}
            style={getListItemStyles(
              activeItem === index || isSelected,
              minItemHeight
            )}
            data-testid="typeahead-list-item"
          >
            <Text
              aria-label={`list item label: ${item.label}`}
              style={{
                overflowWrap: "break-word",
                overflowX: "hidden",
              }}
            >
              {item.label}
            </Text>
          </ListItem>
        )}
      </>
    )
  }
)
