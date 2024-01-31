## Q&A about `React`

### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A `Component` is a piece of code that renders content to the user. It can hold logic, calculations, fetching and other stuffs that the end result would be `HTML` (reactive, but `HTML` nonetheless).
A `PureComponent` has the same principle, with the main differences being that it is a `Class Component` and only re-renders when either their `state` or `props` are changed.

And example where it could break:
```
class ParentComponent extends React.Component {
  render() {
    return (
      <ChildIcon 
        caption="IconStash"
        icons={[require('./icon1'), require('./icon2'), require('./icon3')]}
      />
    )
  }
}

class ChildIcon extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>{this.props.caption}</Text>
        {this.props.icons.map(icon => (
          <Icon source={icon} />
        ))}
      </View>
    )
  }
}
```
Even though the `icons` prop on the parent is the same, it will always fail the re-render check for react, as the equality would be again an array literal (thus tossing away the supposed optimisation provided by `PureComponent`)

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

As `Context` is used to pass data to other components down the tree, it could be missed on a `shouldComponentUpdate` call

### 3. Describe 3 ways to pass information from a component to its PARENT.

- Through `Context` api
- Through `props` callbacks (an `onChange` or `onSave` prop, for example)
- Through `useReducer` hook

### 4. Give 2 ways to prevent components from re-rendering.

- We can use memoization, passing props/states that do not change a lot as dependencies, thus preventing unnecessary re-renders
- `useRef` instead of `useState`, as the first do not fire a re-render

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment can be used to return a single node on a rendered react component by wraping your children without adding another DOM node to the tree.
Although it does not generate a DOM node, it adds a virtual node to the tree, which can break styling apis, or other logical operations targeting only the children of that component.

A simple example:
```
const ChildrenComponent = () => (<>
    <span>title one</span>
    <span>title two</span>
</>)

const ParentComponent = () => {
    // if the function expects children nodes that reside in the DOM
    // to clone them and add classes, the fragment may break this implementation
    const StyledChildren = addClassesToChildren(<ChildrenComponent />)

    return (<StyledChildren />)
}
```

### 6. Give 3 examples of the HOC pattern.

- In Material-UI, `withStyles` is a HOC that adds styling and other styles-related functionality to a `Component`
- In React, the `forwardRef` is a HOC that gives the ability for the Parent to pass a ref to a custom component
- A fictional `withKeybinding` HOC could add functionality to handle key strokes and shortcuts to specific components, as `text fields` or `dropdowns`

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

In promises, if the error happened **after** `resolve` was called, the `catch()` part will not be called
Errors thrown in callbacks may not be caught in try/catch blocks if the callback was asynchronous
In async/await functions, the execution must be finished/awaited before getting caught, with the exception of resolved promises or other asynchronous callbacks

### 8. How many arguments does setState take and why is it async.

Only one, which can be a function or a value. When using a function, React will send the previous state and expect a return with your resulting state, based on your own logic.
It is asynchronous because a `setState` calls triggers the fiber tree reconciliation (re-rendering based of changed states)

### 9. List the steps needed to migrate a Class to Function Component.

- First, we change the class to a function
- Then, we remove the render method, with it's content being directly returned as the result of the component
- All methods must be converted to functions as well
- All references to `this` must be removed as well
- The constructor is no longer necessary. All logic there (as initial state) can then be replaced with the usage of `useState` hook
- The bindings for handlers (when used) can be removed
- We do not need any more `setState` calls. Just use the second de-structured param returned by `useState`
- Most side effects can be replaced with `useEffect` or `useLayoutEffect` or `useState`, so we can remove the lifecycle functions that existed inside the Class component

### 10. List a few ways styles can be used with components.

- By importing stylesheets directly into the component (`import './app.css'`), given that the transpiler is configured to handle this kind of asset
- By passing a object that works according to the `React.CSSProperties` definition directly to html elements (the `style` prop, if supported)

### 11. How to render an HTML string coming from the server.

Although discouraged, we can use `<div dangerouslySetInnerHTML={{__html: '<span>something</span>'}} />` (it is used inside `src/components/Typeahead/components/Dropdown/DropdownListItem.tsx` to handle highlighting of searched terms)