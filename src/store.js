import React from 'react';
import reducer from 'reducer';

const CTX = React.createContext();

const initialState = {
    navOpen: false,
    title: 'Talisman Leather Wholesale',
    activeScreen: null,
    loading: false,
    products: null,
    categoryProducts: null,
    activeProduct: null,
    cart: {
        items: [
            // {
            //     "product": {
            //       "size": null,
            //       "color": "Red",
            //       "color_alt": "White",
            //       "quantity": 1,
            //       "price": 225,
            //       "note": null,
            //       "nickel_hardware": true
            //     },
            //     "productDetails": {
            //       "name": "Rabbit lined Deluxe Set Bondage Restraints",
            //       "price_nickel": "225",
            //       "price_brass": "245",
            //       "description": "Lined with super soft rabbit fur thigh, wrist, and ankle cuffs. A variety of color options. Highly adjustable",
            //       "sizes": [],
            //       "color": [
            //         "Red",
            //         "Saddle",
            //         "Blue",
            //         "Purple",
            //         "Chocolate",
            //         "Mahogany",
            //         "Black (smooth)",
            //         "Black Bullhide",
            //         "Black (soft)",
            //         "Oxblood",
            //         "Brandy Bullhide",
            //         "Burgundy Luster"
            //       ],
            //       "color_alt": [
            //         "White",
            //         "Natural"
            //       ],
            //       "category": [
            //         "Restraints"
            //       ],
            //       "img": [
            //         {
            //           "ID": 93,
            //           "id": 93,
            //           "title": "t0024-1",
            //           "filename": "t0024-1-scaled.jpg",
            //           "filesize": 940762,
            //           "url": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-scaled.jpg",
            //           "link": "http://talisman.newaeoncreative.com/t0024-1/",
            //           "alt": "",
            //           "author": "1",
            //           "description": "",
            //           "caption": "",
            //           "name": "t0024-1",
            //           "status": "inherit",
            //           "uploaded_to": 0,
            //           "date": "2019-12-09 19:26:46",
            //           "modified": "2019-12-09 21:37:01",
            //           "menu_order": 0,
            //           "mime_type": "image/jpeg",
            //           "type": "image",
            //           "subtype": "jpeg",
            //           "icon": "http://talisman.newaeoncreative.com/wp-includes/images/media/default.png",
            //           "width": 1920,
            //           "height": 2560,
            //           "sizes": {
            //             "thumbnail": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-150x150.jpg",
            //             "thumbnail-width": 150,
            //             "thumbnail-height": 150,
            //             "medium": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-225x300.jpg",
            //             "medium-width": 225,
            //             "medium-height": 300,
            //             "medium_large": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-768x1024.jpg",
            //             "medium_large-width": 580,
            //             "medium_large-height": 773,
            //             "large": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-768x1024.jpg",
            //             "large-width": 580,
            //             "large-height": 773,
            //             "1536x1536": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-1152x1536.jpg",
            //             "1536x1536-width": 1152,
            //             "1536x1536-height": 1536,
            //             "2048x2048": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-1536x2048.jpg",
            //             "2048x2048-width": 1536,
            //             "2048x2048-height": 2048,
            //             "post-thumbnail": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-1200x1600.jpg",
            //             "post-thumbnail-width": 1200,
            //             "post-thumbnail-height": 1600,
            //             "twentytwenty-fullscreen": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0024-1-1980x2640.jpg",
            //             "twentytwenty-fullscreen-width": 1980,
            //             "twentytwenty-fullscreen-height": 2640
            //           }
            //         },
            //         {
            //           "ID": 87,
            //           "id": 87,
            //           "title": "t0020-2",
            //           "filename": "t0020-2-scaled.jpg",
            //           "filesize": 533352,
            //           "url": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-scaled.jpg",
            //           "link": "http://talisman.newaeoncreative.com/t0020-2/",
            //           "alt": "",
            //           "author": "1",
            //           "description": "",
            //           "caption": "",
            //           "name": "t0020-2",
            //           "status": "inherit",
            //           "uploaded_to": 0,
            //           "date": "2019-12-09 19:26:29",
            //           "modified": "2019-12-09 21:32:56",
            //           "menu_order": 0,
            //           "mime_type": "image/jpeg",
            //           "type": "image",
            //           "subtype": "jpeg",
            //           "icon": "http://talisman.newaeoncreative.com/wp-includes/images/media/default.png",
            //           "width": 1712,
            //           "height": 2560,
            //           "sizes": {
            //             "thumbnail": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-150x150.jpg",
            //             "thumbnail-width": 150,
            //             "thumbnail-height": 150,
            //             "medium": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-201x300.jpg",
            //             "medium-width": 201,
            //             "medium-height": 300,
            //             "medium_large": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-768x1149.jpg",
            //             "medium_large-width": 580,
            //             "medium_large-height": 868,
            //             "large": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-685x1024.jpg",
            //             "large-width": 580,
            //             "large-height": 867,
            //             "1536x1536": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-1027x1536.jpg",
            //             "1536x1536-width": 1027,
            //             "1536x1536-height": 1536,
            //             "2048x2048": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-1369x2048.jpg",
            //             "2048x2048-width": 1369,
            //             "2048x2048-height": 2048,
            //             "post-thumbnail": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-1200x1795.jpg",
            //             "post-thumbnail-width": 1200,
            //             "post-thumbnail-height": 1795,
            //             "twentytwenty-fullscreen": "http://talisman.newaeoncreative.com/wp-content/uploads/2019/12/t0020-2-1980x2962.jpg",
            //             "twentytwenty-fullscreen-width": 1980,
            //             "twentytwenty-fullscreen-height": 2962
            //           }
            //         }
            //       ],
            //       "is_deerskin": false,
            //       "ID": 209
            //     }
            //   }
        ],
        total: null
    },
    user: {
        name: null,
        email: null,
        phone: null,
        message: null
    }
}

const Store = (props) => {
    const stateHook = React.useReducer(reducer,initialState)
    return (
        <CTX.Provider value={stateHook}>
            {props.children}
        </CTX.Provider>
    )
}

export { CTX }
export default Store;