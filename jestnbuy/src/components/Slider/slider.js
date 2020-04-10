import React from "react";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import amazonSlide from '../../assets/amazonSlide.jpg';
import bestbuySlide from '../../assets/bestbuySlide.jpg';
import ebaySlide from '../../assets/ebaySlide.jpg';
import wallmartSlide from '../../assets/wallmartSlide.jpg';
import './slider.scss';
const images  =   [
  {"image" : bestbuySlide , "href": "http://www.bestbuy.com/site/misc/new-technology/pcmcat234500050002.c?id=pcmcat234500050002http://www.bestbuy.com/site/misc/new-technology/pcmcat234500050002.c?id=pcmcat234500050002" },
  {"image" : amazonSlide , "href": "https://www.amazon.com/dp/B015TJD0Y4/ref=ods_gw_b_h1_ha_justask_white?pf_rd_r=59J66A8YDZ3XZV9JR1S7&pf_rd_p=5a7b64e4-07f2-491e-9846-771b2c56f33b" },
  {"image" : ebaySlide , "href": "https://www.walmart.com/browse/4125?cat_id=4125&facet =special_offers:Clearance%7C%7Cspecial_offers:Rollback%7C%7Cspecial_offers:Special%20Buy&athcpid=nu6h80rl&athpgid=athenaHomepage&athznid=athenaModuleZone&athmtid=AthenaPOVStory&athena=true" },
  {"image" : wallmartSlide , "href": "https://www.ebay.com/" }
];

const Slider  =  ()  => {
  const [index, setIndex]  =   React.useState(0);

  React.useEffect(()  => {
    const timer  =   setInterval(()  => {
      if (index  ===   3) {
        setIndex(0);
      } else {
        setIndex(prev  => prev + 1);
      }
    }, 2000);

    return ()  => clearInterval(timer);

  }, [index]);

  return (
    <Gallery
      style =  {{
        //top:'85px',
        position    : 'relative',
        width       : "100%",
        height      : "100%",
        marginLeft  : 'auto',
        marginRight : 'auto',
        background  : "white",
        overflow    : 'hidden',
      }}
      index =  {index}
      onRequestChange  =  {i  => {
        setIndex(i);
      }}
    >
      {
        images.map( item  =>{

          return (
            <a  key =  { images.indexOf(item) }  href =  { item.href }  target =  "_blank"  rel =  "noopener noreferrer"  > 
              <GalleryImage 
                objectFit =  "contain" 
                key =  {images.indexOf(item)} 
                src =  {item.image} 
                style =   {{
                  width :'auto',
                  height : 'auto',
                }}
              />
            </a>
          )
        })
      }
    </Gallery>
  );
};
export default Slider;
