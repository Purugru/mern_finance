import React from 'react';
import "./footer.css"

const Footer = () => {
    return (
        <div className={`footer-container`}>
            <div className='container mx-auto flex flex-col sm:flex-row justify-between'>
                <div className='mb-4 sm:mb-0 mt-4'>
                    <div className='font-bold text-lg mb-2'>Quick Links</div>
                    <ul className='flex flex-col sm-text-left'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/calculators">Calculators</a></li>
                        <li><a href="/guides">Guides</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
                </div>

                <div className='mb-4 sm:mb-0 mt-4'>
                    <div className='font-bold text-lg mb-2'>Contact Us</div>
                    <p className='flex items-center justify-center cursor-pointer'>
                        {/* <AiOutlineMail size={20} /> */}
                        <span className='ml-2'>Gmail</span>
                    </p>
                </div>

                <div className='mt-4'>
                    <div className='font-bold text-lg mb-2'>Social</div>
                    <div className="flex space-x-2 items-center justify-center">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='flex items-center'>
                            {/* <FaInstagram size={20} /> */}
                            <span className='ml-2'>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
