import React from 'react';

import './Category.scss';
import { Link } from 'react-router-dom';

export const categoryList  = ["All", "Appliances", "Arts And Crafts", "Automotive", "Baby", "Beauty", "Books", "Collectibles", "Electronics", "Fashion", "Fashion Baby", "Fashion Boys", "Fashion Girls", "Fashion Men", "Fashion Women", "Gift Cards", "Grocery", "Handmade", "Health Personal Care", "Home Garden", "Industrial", "Kindle Store", "Lawn And Garden", "Luggage", "Magazines", "Mobile Apps", "Movies", "MP3 Downloads", "Music", "Musical Instruments", "Office Products", "PC Hardware", "Pet Supplies", "Software", "Sporting Goods", "Tools", "Toys", "Video Games", "Seasonal", "Gifts", "Auto Tyres", "Party Occasions", "Household Essentials", "Wine", "Wireless", "Pottery-Glass", "Entertainment Memorabilia", "Real Estate", "Dolls Bears", "Coins Paper Money", "Travel", "Specialty Services", "Antiques", "Cell Phones", "Stamps", "Jewellery Watches", "Tickets Experiences", "Cameras Photo", "Tv And Home Theater", "Blu Ray Players", "Digital Tv Tuners And Converters", "Dvd Players", "Portable Dvd Players"];

const Category  =  ()  => {

    return(
        <div className = 'category'>
            <ul>
            {   
                categoryList.map( category  =>  {
                    return(<li key = {category}  ><Link to='/category' >{ category } </Link> </li>)
                })
            }
            </ul>
        </div>
    );
};



export default Category;
