import { TypeaheadDataList } from "../types"
import { CachingHandler } from "./cachingHandler"

describe("CachingHandler", () => {
  it("should handle caching correctly", () => {
    const callback = jest.fn()
    const cachedResults = new Map<string, TypeaheadDataList>()
    CachingHandler.setCache(
      "term",
      [{ id: 1, label: "label" }],
      cachedResults,
      callback
    )

    expect(callback).toHaveBeenCalledWith(cachedResults)

    expect(() =>
      CachingHandler.setCache("term", [{ id: 1, label: "label" }])
    ).not.toThrowError()

    expect(CachingHandler.getCache("term", cachedResults)).toEqual([
      { id: 1, label: "label" },
    ])

    expect(CachingHandler.getCache("a", cachedResults)).toEqual([])
    expect(CachingHandler.getCache("term")).toEqual([])
  })
})
