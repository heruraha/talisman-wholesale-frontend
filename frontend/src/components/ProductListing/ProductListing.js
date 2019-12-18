import React from 'react'
import './ProductListing.scss'
import Carousel from 'components/Carousel/Carousel'

const ProductListing = (props) => {

    const imgWrapClass = `
        card-img-wrap pointer
        ${props.photos && props.photos.length === 0 && 'd-flex justify-content-center align-items-center'}
    `

    //console.log(props.photos, 'photos')
    return (
        <div className="product-item col-sm-4 mb-3">
            {props.photos && props.photos.length > 1 ? 
                <Carousel img={props.photos} className="product-carousel" />
                :
                <div className={imgWrapClass} onClick={props.onClick}>
                    {props.photos && props.photos.length > 0 ?
                    <div className="product-carousel">
                        <img src={props.photos[0].sizes.medium_large} alt="" />
                    </div>
                    :
                    <svg width={62.7} height={54.6}>
                    <g fill="#D3D3D3">
                      <path d="M17.8 18.8c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.3-5 5 2.3 5 5 5zM42.2 26.9c-2.7 1.3-4.9 3.4-6.5 6H18c-.4 0-.9.1-1.4 0h-9v-1.1c0-2.6 2.1-4.7 4.7-4.7h8c1.1-1.5 1.9-2.7 2-2.8.7-1 1.5-1.5 2.5-1.5 1.4 0 2.1 1.5 3.2 2.1 1.4.8 2.4-.3 3-1.4.5-.7 1-1.5 1.4-2.3.3-.4.6-.9.8-1.4.3-.5.7-1.1 1-1.6l.7-1.1c.1-.1.1-.2.2-.2.3-.4.5-.6.8-.6.2 0 .5.2.7.6 1.9 3.3 3.7 6.7 5.6 10z" />
                      <path d="M0 0v41.7h33.4v-.9c0-.9.1-1.8.3-2.7H3.6V3.6h45.5v21.6h.2c1.2 0 2.3.1 3.4.4V0H0z" />
                      <path d="M49.2 27.3c-7.4 0-13.6 6.1-13.7 13.4-.1 7.7 5.8 13.8 13.4 13.9h.2c3.7 0 7.1-1.4 9.6-3.9 2.6-2.6 4-6 4-9.6.1-7.6-5.9-13.7-13.5-13.8zm-1.4 24c-4.3-.7-7.2-3.1-8.6-7.2-1.1-3.2-.6-6.4 1.5-9.3l14.6 14.6c-2.2 1.7-4.8 2.3-7.5 1.9zm9.8-4.1L43 32.6c2.4-1.8 5-2.4 7.8-1.9 4.2.7 7 3.1 8.3 7.1 1.1 3.2.6 6.4-1.5 9.4z" />
                    </g>
                  </svg>
                    }

                </div>
            }
            <h4 onClick={props.onClick}>{props.name}</h4>
            
        </div>
    )
}

export default ProductListing;