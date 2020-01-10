import React from 'react'
import Header from 'components/Header/Header'

const Terms = (props) => {
    return (
        <>
      <Header props={props} />
      <div className="container p-0 mb-5">
      <h2>Wholesale Policies</h2>

        <ul className="headline mx-0 px-4">
        <li className="py-2">Minimum wholesale order is $1,000.</li>
        <li className="py-2">Order production will begin on receipt of full payment.</li>
        <li className="py-2">Please order at least 6 weeks in advance</li>
        <li className="py-2">Contact us for rush orders</li>
        <li className="py-2">Rush orders may be accommodated with a fee.</li>
        <li className="py-2">We handcraft all pieces, so please discuss your deadlines.</li>
        <li className="py-2">Leather sample cards available with order.</li>
        <li className="py-2">Color and sizing requests welcome.</li>
        <li className="py-2">All hardware will be silver, unless otherwise requested.</li>
        <li className="py-2">Other hardware colors are subject to an appropriate upcharge.</li>
        <li className="py-2">Custom, shop specific pieces are welcome.</li>
        <li className="py-2">If you have any problems with your order, please contact us.</li>
        <li className="py-2">Returns and exchanges available for craftsmanship and sizing issues; Otherwise, all sales are final.</li>
        <li className="py-2">Questions are super welcome- get in touch!</li>
        </ul>

        <p className="text-center mt-5 alert border-dark gold">
            Want to check in with another shop who carries our work? <a href="http://shop.dynamotoys.com/" target="_blank">Visit Dynamo in New Orleans!</a>
        </p>

      </div>
        </>
    )
}

export default Terms