import React, { useState, useEffect, memo, useRef } from "react";
import PropTypes from "prop-types";
import "./list.css";
import SwitchSelector from "react-switch-selector";
import {FaLinkedin, FaGithub, FaLink} from 'react-icons/fa';

// single item
const WrappedSingleListItem = ({index,isSelected,onClickHandler,onKeyDownHandler,text,}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isSelected) {
      ref.current.focus();
    }
  }, [isSelected]);

  return (
    <div
      className={`SingleListItem ${isSelected ? "selected" : ""}`}
      onClick={() => onClickHandler(index)}
      onKeyDown={(event) => onKeyDownHandler(event, index)}
      tabIndex={0}
      ref={ref}
    >
      {text}
    </div>
  );
};

const SingleListItem = memo(WrappedSingleListItem);

const WrappedListComponent = ({ items }) => {
  
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const selectedItems = items.filter((item, index) => selectedIndex.includes(index));
  const selectedItemsText = selectedItems.map(item => item.text).join(", ");

  useEffect(() => {
    const choices = document.getElementById('choices');
  
    function typeWriter(text, i) {
      if (i < choices.innerText.length) {
        choices.innerText = choices.innerText.slice(0, -1);
        setTimeout(() => typeWriter(text, i), 100);
      } else if (i < text.length) {
        choices.innerText += text.charAt(i);
        setTimeout(() => typeWriter(text, i+1), 100);
      }
    }
  
    typeWriter(selectedItemsText, 0);
  
  }, [selectedItemsText]);

  const handleClick = (index) => {
    if (isMultiSelect) {
      setSelectedIndex((selectedIndex) => {
        const indexInArray = selectedIndex.indexOf(index);
        if (indexInArray === -1) {
          return [...selectedIndex, index];
        } else {
          return selectedIndex.filter((i) => i !== index);
        }
      });
    }
    else {
      setSelectedIndex([index]);
    }

  };

  const handleClearSelection = () => {
    setSelectedIndex([]);
  };

  const handleKeyDown = (event, index) => {
    if(!isMultiSelect){
      if (event.keyCode === 37) {
        const newIndex = (index - 1 + items.length) % items.length;
        setSelectedIndex([newIndex]);
      }

      if (event.keyCode === 39) {
        const newIndex = (index + 1) % items.length;
        setSelectedIndex([newIndex]);
      }
    }
  };

  const options = [
    {
      label: <span>SINGLE</span>,
      value: 0,
      selectedBackgroundColor: "#fbc531",
    },
    {
      label: <span>MULTI</span>,
      value: 1,
      selectedBackgroundColor: "#fbc531",
    },
  ];
  const initialSelectedIndex = options.findIndex(({ value }) => value === 0);

  return (
    <div className="container">

      <div className="Title">
        <h1 className="h1txt">SteelEye Assignment</h1>
        <span className="subtxt"><h2>Rohit Raj <a href="https://alfredx.in">[Portfolio]</a></h2></span>
      </div>

      <div className="items">
        {items.map((item, index) => (
          <SingleListItem
            onClickHandler={() => handleClick(index)}
            onKeyDownHandler={handleKeyDown}
            text={item.text}
            index={index}
            isSelected={selectedIndex.includes(index)}
            key={index}
          />
        ))}
      </div>

      <div className="button-container">
        <button onClick={handleClearSelection}>CLEAR SELECTION</button>
        <div className="switch">
          <SwitchSelector
            onChange={()=>{setIsMultiSelect(!isMultiSelect);setSelectedIndex([]);}}
            options={options}
            initialSelectedIndex={initialSelectedIndex}
            backgroundColor={"#1a1a1a"}
            fontColor={"#f5f6fa"}
            optionBorderRadius={20}
            fontSize={14}
          />
        </div>
      </div>

      <div className="txtinfo">
        You Selected: <span id="choices"></span>
      </div>

      <div className="footer__socials">
          <a href="https://www.linkedin.com/in/rohitraj45/" className="footer__social-link">
            <FaLinkedin />
          </a>

          <a href="https://github.com/alfredxio" className="footer__social-link">
            <FaGithub />
          </a>

          <a href="https://alfredx.in" className="footer__social-link">
            <FaLink />
          </a>
      </div>

    </div>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

const List = memo(WrappedListComponent);

WrappedListComponent.defaultProps = {
  items: [
    {
      text: "1",
    },
    {
      text: "2",
    },
    {
      text: "3",
    },
    {
      text: "4",
    },
    {
      text: "5",
    },
    {
      text: "6",
    },
  ],
};

export default List;
