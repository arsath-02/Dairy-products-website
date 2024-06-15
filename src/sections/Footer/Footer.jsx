import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h3>Contact Us</h3>
          <ul>
            <li><strong>Email:</strong> arsathmohamed@gmail.com</li>
            <li><strong>Phone:</strong> +91 90800 41101 </li>
            <li><strong>Address:</strong> 11 ,Dubai Kuruku Santhu, Dubai Main Road, Dubai</li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>Follow Us</h3>
          <ul className='social-links'>
            <li><a href='https://www.facebook.com/milkymistdairy/'>Facebook</a></li>
            <li><a href='https://www.youtube.com/watch?v=aEAQXr2AZps'>Youtube</a></li>
            <li><a href='https://www.instagram.com/milkymistdairy/'>Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
