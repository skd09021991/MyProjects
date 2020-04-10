import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBox.scss';

const SearchBox  =  props  => {

    const searchHandler = () => {
        alert('handle search logic function on this click');
    };
    return(
        <div className = 'SearchBox'>
            <div className = 'InputContainer'>
                <input type = 'text' placeholder = 'Search Products'/>  
                <button   onClick = { searchHandler }>
                    <span>
                        <SearchIcon  className = 'SearchIcon'
                            style = {{
                                position:'relative',
                                //backgroundColor:'#83b732',
                                color   : 'white',
                                top     : '-5px',
                                left    : '-3px',
                                height  : '36px',
                                width   : '45px',
                                //borderTopRightRadius: '3px',
                                //borderTopLeftRadius: '3px',
                            }}
                        />  
                    </span>
                </button>
            </div>
        </div>
    );
};
export default SearchBox;