import React from 'react'
import { FaShieldAlt, FaCogs, FaLock } from 'react-icons/fa';
export default function securesection() {
   return (
      <div className='secure-section'>
         <div className='secure-header'>
            <h1>Secure Identify Vulnerabilities Easily</h1>
            <h2>Empower your team to enhance application security today.</h2>
         </div>
         <div className='secure-boxes'>
            <div className='secure-box'>
               <FaShieldAlt className="secure-icon" />
               <h2>Your Security Matters</h2>
               <h4> Discover how to identify and address vulnerabilities in your applications with both effectiveness and efficiency. This essential skill will empower you to enhance the security of your software, ensuring it remains robust against potential threats. By mastering these techniques, you can take proactive steps to protect your applications.</h4>
            </div>
            <div className='secure-box'>
               <FaCogs className="secure-icon" />
               <h2> Steps to Secure Your Applications</h2>
               <h4> Gain a comprehensive understanding of the top security risks that organizations and individuals face today in our increasingly digital and interconnected world.</h4>
            </div>
            <div className='secure-box'>
               <FaLock className="secure-icon" />
               <h2>Tools for Vulnerability Assessment</h2>
               <h4>Take full advantage of our extensive resources to significantly enhance and strengthen your defenses against potential threats and vulnerabilities.</h4>
            </div>
         </div>
      </div>
   )
}
