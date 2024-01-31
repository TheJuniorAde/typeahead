# Simple typeahead/autocomplete component

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.


## Info about the component

- A complete list of properties and settings can be found inside `src/components/Typeahead/types.ts` (interface `TypeaheadProps`)
- When focused, you can navigate through the typeahead/autocomplete options using **Arrow Down** and **Arrow Up**
- By pressing **Esc**, the menu will be closed
- You can use it as a `multiple` or `single` selection component, with the default being `single`
- When using `multiple` and focused, you can use `backspace` to remove the last selected option
- This component can be used with local or remote fetched data
- You can use the built-in implementation of **Caching** or provide your own caching strategy through the usage of the `cachingSettings` prop
- Examples are available when running the project