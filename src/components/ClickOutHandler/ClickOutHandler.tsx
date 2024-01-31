import React, { useEffect, useRef } from "react"

export interface ClickOutHandlerProps extends React.PropsWithChildren {
  onClickOut: () => void
}

export const ClickOutHandler: React.FC<ClickOutHandlerProps> = ({
  children,
  onClickOut,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const clickOutEventHandler = (event: MouseEvent) =>
    !containerRef.current?.contains(event.target as Element) && onClickOut()

  useEffect(() => {
    document.addEventListener("click", clickOutEventHandler, true)

    return () => {
      document.removeEventListener("click", clickOutEventHandler, true)
    }
  }, [onClickOut, containerRef.current])

  return <div ref={containerRef}>{children}</div>
}
