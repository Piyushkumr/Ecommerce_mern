import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt='playstore' />
            <img src={appstore} alt='Appstore' />
        </div>

        <div className='midFooter'>
            <h1>ECOMMERCE</h1>
            <p>High Quality is our first priority</p>

            <p>Copyrights 2025 &copy; MePiyush</p>
        </div>

        <div className='rightFooter'>
            <h4>Follow Us</h4>
            <a href='https://www.instagram.com/piyush_prajapati__/'>Instagram</a>
            <a href='https://www.instagram.com/piyush_prajapati__/'>Instagram</a>
            <a href='https://www.instagram.com/piyush_prajapati__/'>Instagram</a>
        </div>
        
    </footer>
  )
}

export default Footer