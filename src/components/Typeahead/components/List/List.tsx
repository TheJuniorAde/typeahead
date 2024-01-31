import React, { useContext } from "react"
import { TypeaheadDataListItem } from "../../types"
import { SingleListItem } from "./ListItem"
import { TypeaheadContext } from "../../Typeahead"

import "./List.css"

export interface ListProps {
  style?: React.CSSProperties
  renderRow: (item: TypeaheadDataListItem, index: number) => React.ReactNode
}

export const List: React.FC<ListProps> = ({ style, renderRow }) => {
  const { data, loading, menuLabels, minItemHeight } =
    useContext(TypeaheadContext)

  return (
    <div className="list-root" style={style}>
      {loading && (
        <SingleListItem
          label={menuLabels.fetchingResults}
          minItemHeight={minItemHeight}
        />
      )}
      {data.length === 0 && !loading && (
        <SingleListItem
          label={menuLabels.noResultsFound}
          minItemHeight={minItemHeight}
        />
      )}
      {data.map((item, index) => renderRow(item, index))}
    </div>
  )
}
