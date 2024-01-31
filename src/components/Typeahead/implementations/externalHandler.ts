import { getErrorTag } from "../business/constraints"
import {
  TypeaheadDataList,
  TypeaheadExternalProps,
  TypeaheadProps,
  TypeaheadReducerAction,
  TypeaheadReducerActionEnum,
} from "../types"

/**
 * The data fetching implementation
 */
export const ExternalHandler = {
  async fetchData(
    dispatch: (value: TypeaheadReducerAction) => void,
    memoizedProps: TypeaheadProps,
    newTerm: string
  ): Promise<TypeaheadDataList> {
    let newData: TypeaheadDataList = []

    dispatch({
      type: TypeaheadReducerActionEnum.TOGGLE_LOADING,
      package: true,
    })

    try {
      const response = await fetch(
        this.assembleUrl(memoizedProps.externalSettings!, newTerm)
      )

      const responseData = await response.json()

      newData = memoizedProps.externalSettings?.transform
        ? memoizedProps.externalSettings?.transform(responseData)
        : responseData
    } catch (error) {
      console.error(
        `${getErrorTag(
          "external"
        )}:[fetching]: An error occurred during the 'fetch data' step.\n${error}`
      )
    } finally {
      dispatch({
        type: TypeaheadReducerActionEnum.TOGGLE_LOADING,
        package: false,
      })
    }

    return newData
  },
  assembleUrl(externalSettings: TypeaheadExternalProps, newTerm: string) {
    return externalSettings.url
      ? `${externalSettings.url}?${
          externalSettings.criteria
        }=${encodeURIComponent(newTerm)}`
      : externalSettings.getUrl!(newTerm)
  },
}
