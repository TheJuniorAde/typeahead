import {
  validateMenuSettingsConstraint,
  validateSelectedItemsConstraint,
  validateExternalSourceConstraints,
  validateCachingConstraints,
} from "./constraints"

describe("constraints", () => {
  it("should validate the caching settings", () => {
    expect(() => {
      validateCachingConstraints(true, { getCachedResults: jest.fn() })
    }).toThrowError(
      "[TypeaheadError]:[cachingSettings]: when 'cachingSettings.caching' is true and either 'cachingSettings.getChachedResults' or 'cachingSettings.setChachedResults' are set, you must provide the implementation to both functions"
    )

    expect(() => {
      validateCachingConstraints(true, { setCachedResults: jest.fn() })
    }).toThrowError(
      "[TypeaheadError]:[cachingSettings]: when 'cachingSettings.caching' is true and either 'cachingSettings.getChachedResults' or 'cachingSettings.setChachedResults' are set, you must provide the implementation to both functions"
    )
  })

  it("should validate the selected items provided", () => {
    expect(() => {
      validateSelectedItemsConstraint(true, { id: "id", label: "label" })
    }).toThrowError(
      "[TypeaheadError]:[selected]: when 'multiple' is true, 'selected' must be an array"
    )

    expect(() => {
      validateSelectedItemsConstraint(false, [{ id: "id", label: "label" }])
    }).toThrowError(
      "[TypeaheadError]:[selected]: when 'multiple' is false, 'selected' must be an object"
    )
  })

  it("should validate the external settings", () => {
    expect(() => {
      validateExternalSourceConstraints(true, {})
    }).toThrowError(
      "[TypeaheadError]:[externalSettings]: when 'externalSettings.external' is true, either 'externalSettings.url' OR 'externalSettings.getUrl' must be set"
    )

    expect(() => {
      validateExternalSourceConstraints(true, {
        url: "http://test.com",
        criteria: "",
      })
    }).toThrowError(
      "[TypeaheadError]:[externalSettings]: when 'externalSettings.external' is true and 'externalSettings.url' is informed, 'externalSettings.criteria' must be informed"
    )

    expect(() => {
      validateExternalSourceConstraints(true, { url: "http://test.com" })
    }).toThrowError(
      "[TypeaheadError]:[externalSettings]: when 'externalSettings.external' is true and 'externalSettings.url' is informed, 'externalSettings.criteria' must be informed"
    )

    expect(() => {
      validateExternalSourceConstraints(true, {
        url: "http://test.com",
        criteria: "q",
      })
    }).toThrowError(
      "[TypeaheadError]:[externalSettings]: when 'externalSettings.external' is true, 'externalSettings.transform' must be informed"
    )
  })

  it("should validate the menu settings", () => {
    expect(() => {
      validateMenuSettingsConstraint({
        minItemHeight: 0,
        maxMenuHeight: 0,
        menuLabels: {
          noResultsFound: "N",
          fetchingResults: "N",
        },
      })
    }).toThrowError(
      "[TypeaheadError]:[menuSettings]: neither 'maxMenuHeight' nor 'minItemHeight' can be less than 1"
    )

    expect(() => {
      validateMenuSettingsConstraint({
        minItemHeight: 2,
        maxMenuHeight: 1,
        menuLabels: {
          noResultsFound: "N",
          fetchingResults: "N",
        },
      })
    }).toThrowError(
      "[TypeaheadError]:[menuSettings]: 'minItemHeight' must not be higher than 'maxMenuHeight'"
    )

    expect(() => {
      validateMenuSettingsConstraint({
        minItemHeight: 2,
        maxMenuHeight: 2,
        menuLabels: {
          noResultsFound: "",
          fetchingResults: "N",
        },
      })
    }).toThrowError(
      "[TypeaheadError]:[menuSettings]: neither 'menuLabels.fetchingResults' nor 'menuLabels.noResultsFound' can be an empty string"
    )

    expect(() => {
      validateMenuSettingsConstraint({
        minItemHeight: 2,
        maxMenuHeight: 2,
        menuLabels: {
          noResultsFound: "N",
          fetchingResults: "",
        },
      })
    }).toThrowError(
      "[TypeaheadError]:[menuSettings]: neither 'menuLabels.fetchingResults' nor 'menuLabels.noResultsFound' can be an empty string"
    )
  })
})
