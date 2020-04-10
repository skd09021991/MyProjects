import React from 'react';

import './CategoryDrawer.scss';

const CatagoryDrawer = props => {
    let categoryList = ["All", "Appliances", "Arts And Crafts", "Automotive", "Baby", "Beauty", "Books", "Collectibles", "Electronics", "Fashion", "Fashion Baby", "Fashion Boys", "Fashion Girls", "Fashion Men", "Fashion Women", "Gift Cards", "Grocery", "Handmade", "Health Personal Care", "Home Garden", "Industrial", "Kindle Store", "Lawn And Garden", "Luggage", "Magazines", "Mobile Apps", "Movies", "MP3 Downloads", "Music", "Musical Instruments", "Office Products", "PC Hardware", "Pet Supplies", "Software", "Sporting Goods", "Tools", "Toys", "Video Games", "Seasonal", "Gifts", "Auto Tyres", "Party Occasions", "Household Essentials", "Wine", "Wireless", "Pottery-Glass", "Entertainment Memorabilia", "Real Estate", "Dolls Bears", "Coins Paper Money", "Travel", "Specialty Services", "Antiques", "Cell Phones", "Stamps", "Jewellery Watches", "Tickets Experiences", "Cameras Photo", "Tv And Home Theater", "Blu Ray Players", "Digital Tv Tuners And Converters", "Dvd Players", "Portable Dvd Players"];
    return (
        <div className = 'CategoryDrawer'>

            <ul  >
                {
                    categoryList.map( categoryItem => {
                        return(
                            <li key = { categoryItem } ><a href ='/category'   > { categoryItem } </a> </li>
                            // <li key={ categoryItem } ><div href='/'   > { categoryItem } </div> </li>
                        )
                    })
                }

            </ul>
        </div>
    );
};

export default CatagoryDrawer;