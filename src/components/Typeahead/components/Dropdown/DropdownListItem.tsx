import React, { useContext, useMemo } from "react"
import { ListItem } from "../List"
import { Text } from "../Text"
import { ItemProps } from "../../types"
import { getListItemStyles } from "../../business/utils"
import { TypeaheadContext } from "../../Typeahead"

/**
 * The List item for the pop-up list. As this component can be called multiple times at once
 * (and given the fact that it can be rendered again if it goes back to the viewport) we memoize it!
 * @param {ItemProps} props
 */
export const DropdownListItem = React.memo(
  ({
    index,
    item,
    activeItem,
    loading,
    onClick,
    checkIfSelected,
    minItemHeight,
  }: ItemProps) => {
    const isSelected = checkIfSelected(item)
    const { deferredTerm } = useContext(TypeaheadContext)

    const highlightedText = useMemo(() => {
      const cleanTerm = deferredTerm.trim().toLowerCase()
      const label = String(item.label)

      if (!cleanTerm) return { __html: label }

      const termIndex = label.toLowerCase().indexOf(cleanTerm)

      return {
        __html: `${label.substring(
          0,
          termIndex
        )}<span class="highlighted">${label.substring(
          termIndex,
          termIndex + cleanTerm.length
        )}</span>${label.substring(termIndex + cleanTerm.length)}`,
      }
    }, [deferredTerm, item.label])

    return (
      <>
        {!loading && !!item && (
          <ListItem
            id={`list-item-${index}`}
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
              <div dangerouslySetInnerHTML={highlightedText} />
            </Text>
          </ListItem>
        )}
      </>
    )
  }
)
