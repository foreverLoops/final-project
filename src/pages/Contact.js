import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
    return (
        <div >
            <Navbar/>
            <div className='flex justify-center items-center my-6'>
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Send us a message and we'll get back to you soon.</p>
                <form
                    action="https://getform.io/f/pbqgddgb"
                    method="POST"
                    className="contact-form"
                >
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="4" required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
        <Footer/>
        </div>
    )
}
