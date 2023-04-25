# SteelEye Assignment

#### Rohit Raj | mr.rajarohit9431@gmail.com | +918789517485 | https://alfredx.in
### Live Link of this assignment: https://alfredx.in/steeleye.html

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


### Optimization
To optimize the handleClick function using useCallback, we can wrap the function inside the useCallback hook and provide selectedIndex and setSelectedIndex as dependencies. This will avoid unnecessary re-renders of the SingleListItem components. Here's the updated code:
```js
const handleClick = useCallback(
  (index) => {
    setSelectedIndex(index);
  },
  [setSelectedIndex]
);
```

## Code Output
After fixing all the above errors and starting the react-app we receive below output:

![image](https://user-images.githubusercontent.com/87885945/233741441-ec3eb8ac-a43e-44e6-972a-9b4be4c82083.png)

## Enhanced Version
![Screenshot 2023-04-22 091448](https://user-images.githubusercontent.com/87885945/233761470-c9dbefb2-245c-471a-b4de-542b9edf2d71.png)

I improved the List component in React by adding a multiselect feature and enhancing the user interface styling. The component allows users to select multiple items and displays the selected items' text, making it easier for users to keep track of their selections. I also paid close attention to styling and layout, making the component more professional and visually appealing.
To showcase my work, I added the updated List component to my GitHub repository and also hosted the same as a page on my hosted webpage https://alfredx.in/steeleye.html. I also included a detailed description of the changes in the README.md file, along with screenshots of the updated component.
