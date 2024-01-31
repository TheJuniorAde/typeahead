import React, { forwardRef } from "react"

import "./List.css"

export interface ListProps {
  style?: React.CSSProperties
  count: number
  renderRow: (index: number) => React.ReactNode
}

export const List = forwardRef(
  (
    { style, count, renderRow }: ListProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <div className="list-root" style={style} ref={ref}>
      {Array(count)
        .fill(null)
        .map((_: null, index) => renderRow(index))}
    </div>
  )
)
