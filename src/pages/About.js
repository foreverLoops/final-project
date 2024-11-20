import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import logo from "../media/logo.png"
export default function About() {
    return (
        <div>
            <Navbar />
            <section className="about-section">
                <p>
                    Welcome to ShopSphere, where quality meets convenience! We bring you the best,
                    carefully curated to fit your lifestyle. Shop with us for unbeatable prices, exceptional
                    customer service, and a seamless shopping experience!
                </p>
            </section>

            <section className="core-values">
                <h2>OUR CORE VALUES</h2>
                <div className="values-container">
                    {[
                        { src: 'media/innovation.jpg', alt: 'Innovation Icon', label: 'Innovation' },
                        { src: 'media/care.png', alt: 'Care Icon', label: 'Care for our people' },
                        { src: 'media/growth.png', alt: 'Growth Icon', label: 'Dynamic Growth' },
                        { src: 'media/customerO.png', alt: 'Customer Oriented Icon', label: 'Customer Oriented' },
                        { src: 'media/commitment.png', alt: 'Commitment Icon', label: 'Commitment' }
                    ].map((value, index) => (
                        <div key={index} className="value-item">
                            <img src={value.src} alt={value.alt} />
                            <p>{value.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="story-section">
                <h1>Our Story that makes us unique.....</h1>
                <p>
                    At ShopSphere we believe in the power of small businesses and the passion behind every product.
                    Our platform is dedicated to giving local vendors a voice, allowing them to showcase their unique creations to a broader audience.
                    By shopping with us, you're not only discovering one-of-a-kind items, but you're also supporting the dreams of small entrepreneurs.
                    Together, we can create a community where small businesses thrive, and every purchase makes a big impact.
                </p>
            </section>

            {/* Development Team Section */}
            <section id="devTeam" className="team-section">
                <h1 className="heading-center">Development Team</h1>
                <div className="team-container">
                    <div className="team-member">
                        <img src="/media/Aphiwe.jpg" alt="Aphiwe Ncayiyane" className="avatar" />
                        <p className="name">Aphiwe Ncayiyane</p>
                        <p className="quote">"How is never as important as<br /> why"</p>
                        <div className="social-icons">
                            <a href="https://github.com/ncayiyane"><i className="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/aphiwe-ncayiyane-4149b31a8"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src="/media/mogamat.jpg" alt="Mogamat Jaleel Lee" className="avatar" />
                        <p className="name">Mogamat Jaleel Lee</p>
                        <p className="quote">"Be the change you wish to see <br />in the world"</p>
                        <div className="social-icons">
                            <a href="https://github.com/Lee01-bit"><i className="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/jaleel-lee-6b441920b"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src="/media/petersen.jpg" alt="Shabbeer Petersen" className="avatar" />
                        <p className="name">Shabbeer Petersen</p>
                        <p className="quote">"Everything you've done up until<br />now has not gone to waste."</p>
                        <div className="social-icons">
                            <a href="https://github.com/Shabbeer10"><i className="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/shabbeer-petersen-342868277"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src="/media/yusri.jpg" alt="Yusri Nelson" className="avatar" />
                        <p className="name">Yusri Nelson</p>
                        <p className="quote">"Futures don't make themselves,<br /> you create them."</p>
                        <div className="social-icons">
                            <a href="https://github.com/yusrinelson"><i className="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/yusri-nelson/"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <img src="/media/mulalo.jpg" alt="Mulalo Masithembi" className="avatar" />
                        <p className="name">Mulalo Masithembi</p>
                        <p className="quote">"Your patience is your<br /> power."</p>
                        <div className="social-icons">
                            <a href="https://github.com/Mu936/"><i className="fa-brands fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/mulalo-ivy-masithembi-7a74b9329"><i className="fa-brands fa-linkedin" /></a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
