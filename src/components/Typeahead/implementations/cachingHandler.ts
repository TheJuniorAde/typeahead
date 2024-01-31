import { TypeaheadDataList, TypeaheadReducerState } from "../types"

/**
 * The caching implementation.
 * It's the default caching strategy used in this component
 */
export const CachingHandler = {
  /**
   * Sets the cache. If no previous cached results are informed, the hash map is created
   */
  setCache(
    term: string,
    data: TypeaheadDataList,
    currentCachedResults?: TypeaheadReducerState["cachedResults"],
    callback?: (data: Map<string, TypeaheadDataList>) => void
  ) {
    const clearTerm = term.trim().toLowerCase()

    currentCachedResults =
      currentCachedResults || new Map<string, TypeaheadDataList>()
    currentCachedResults.set(clearTerm, data)

    !!callback && callback(currentCachedResults)
  },
  /**
   * Retrieves the cache. If no previous cached results are found (or the cache is empty), we return an empty array
   */
  getCache(
    term: string,
    currentCachedResults?: TypeaheadReducerState["cachedResults"]
  ) {
    const clearTerm = term.trim().toLowerCase()

    if (!currentCachedResults || currentCachedResults.size === 0) {
      return []
    }

    return currentCachedResults.get(clearTerm) || []
  },
}
