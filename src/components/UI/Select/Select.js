import { default as RSelect } from 'react-select';

const Select = ({ options, onSelect, name, value, ...props }) => {
  const handleInputChange = value => {
    if (name) onSelect({ target: { name, value: value.value } });
    else onSelect(value.value);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: '#04121e',
      color: 'white',
      ':active': {
        background: '#1d7dcf'
      }
    }),
    control: (provided, state) => ({
      ...provided,
      height: '1em',
      borderRadius: '0px',
      border: state.isFocused ? '1px solid #1d7dcf' : '1px solid #1d7ccf00',
      transition: 'border 0.2s ease',
      fontWeight: 400,
      outline: 'none',
      backgroundColor: '#030f1a',
      boxShadow: 'none',
      ':hover': {
        boxShadow: 'none',
        border: '1px solid #1d7dcf'
      }
    }),
    input: (provided, state) => ({
      ...provided,
      color: 'white',
      fontSize: '1em',
      fontWeight: 400
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white',
      fontSize: '1em',
      fontWeight: 400
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: '0px',
      background: '#04121e',
      marginTop: '0px',
      '::-webkit-scrollbar': {
        width: '0px',
        background: 'transparent'
      }
    })
  };

  return (
    <RSelect
      onChange={handleInputChange}
      styles={customStyles}
      options={options}
      value={options.find(opt => opt.value === value) || ''}
      {...props}
    />
  );
};

// const Select = props => {
//   const [options, setOptions] = useState({
//     items: props.options,
//     showItems: false,
//     selectedItem: props.value
//       ? props.options.find(
//           option => option.value.toLowerCase() === props.value.toLowerCase()
//         )
//       : props.options[0]
//   });

//   const handleDropDown = () => {
//     setOptions(prevState => ({
//       ...prevState,
//       showItems: !options.showItems
//     }));
//   };

//   const handleSelectItem = item => {
//     setOptions(prevState => ({
//       ...prevState,
//       showItems: false,
//       selectedItem: item
//     }));
//     props.onSelect(item.value);
//   };

//   const ref = useRef(null);
//   useClickAway(ref, () => {
//     setOptions(prevState => ({
//       ...prevState,
//       showItems: false
//     }));
//   });

//   return (
//     <div
//       className={`${classes.container} ${props.className && props.className}`}
//       ref={ref}
//     >
//       <div
//         onClick={handleDropDown}
//         className={classes['select-visible-container']}
//       >
//         <div className={classes['selected-item']}>
//           {options.selectedItem?.value || ''}
//         </div>
//         <div className={classes['select-arrow']}>
//           {options.showItems ? (
//             <Icon name="arrowDropUpFilled" />
//           ) : (
//             <Icon name="arrowDropDownFilled" />
//           )}
//         </div>
//       </div>
//       <div
//         style={{ display: options.showItems ? 'block' : 'none' }}
//         className={classes['select-items']}
//       >
//         {props.options.map(item => (
//           <div
//             key={item.id}
//             onClick={() => handleSelectItem(item)}
//             className={options.selectedItem === item ? 'selected' : ''}
//           >
//             {item.value}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Select;
