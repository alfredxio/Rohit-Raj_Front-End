# SteelEye Assignment
## CODE REVIEW

The code defines a React component called List that receives an array of items as a prop and renders a list of those items. It uses two components, SingleListItem and WrappedSingleListItem, to render each item in the list. SingleListItem is a memoized version of WrappedSingleListItem and receives props like index, isSelected, onClickHandler, and text. It renders an li element with the text of the item and sets a background color based on the isSelected prop. The List component maps over the items array to render each item as a SingleListItem component. It also maintains state for selectedIndex and defines a click handler to update the selectedIndex state variable when a SingleListItem is clicked. When the items prop changes, it sets the selectedIndex state variable to null using a useEffect hook.


## ERRORS DETECTED

On proper analysis of the given code, I found these errors:

### Error 1
In the WrappedSingleListItem component, onClickHandler is being called with an argument (index) when it should be a function. It should be changed to:
```js
onClick={() => onClickHandler(index)}
```

### Error 2
In the WrappedListComponent component, useState is being used incorrectly. It should be:
```js
const [selectedIndex, setSelectedIndex] = useState(null);
```

### Error 3
In the WrappedListComponent component, the propTypes for items is incorrectly defined. It should be:
```js
items: PropTypes.arrayOf(PropTypes.shape({
  text: PropTypes.string.isRequired,
})),
```

### Error 4
In the WrappedListComponent component, defaultProps for items should be an empty array instead of null. It should be:
```js
WrappedListComponent.defaultProps = {
  items: [],
};
```

### Error 5
In the SingleListItem component, the isSelected prop is being passed the state variable selectedIndex, which is an object returned by the useState hook. isSelected should be a boolean value representing whether the item is selected or not. Therefore, it should be changed to:
```js
isSelected={selectedIndex === index}
```

## Code Output
After fixing all the above errors and starting the react-app we receive below output:

![image](https://user-images.githubusercontent.com/87885945/233741441-ec3eb8ac-a43e-44e6-972a-9b4be4c82083.png)


