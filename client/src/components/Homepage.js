import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import homeImage1 from "../assets/homeimage1.jpg";
import homeImage2 from "../assets/homeimage2.jpg";
import homeImage3 from "../assets/homeimage3.jpg";
import styles from "../styles/Homestyle.module.css";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <div className="container mx-auto flex-grow py-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${styles.homeGrid}`}>
            {/* Section 1 */}
            <div className={`p-4 ${styles.glass} ${styles.zoomEffect} md:p-6 flex flex-col justify-center items-center`}>
              <div className={`text-2xl font-bold mb-4 ${styles.hoverEffect}`}>
                Ayurvedic Medicines at Our Spa
              </div>
              <p className={styles.hoverEffect}>
                Welcome to the realm of Ayurvedic healing at our luxurious spa. <br />
                Here, you'll embark on a journey to discover the profound world <br />
                of Ayurvedic medicines. Our treatments are meticulously designed <br />
                to help you unwind, reinvigorate, and provide you with an <br />
                exceptional experience of wellness. From revitalizing massages to <br />
                rejuvenating herbal therapies, our spa offers a wide array of treatments. <br />
                Each visit promises to be an exploration of Ayurveda's timeless wisdom <br />
                and a gateway to complete relaxation and rejuvenation.
              </p>
            </div>
            <div className="p-4">
              <img src={homeImage1} alt="Spa 1" className="w-full h-auto" />
            </div>

            {/* Section 2 */}
            <div className="p-4">
              <img src={homeImage2} alt="Spa 2" className="w-full h-auto" />
            </div>
            <div className={`p-4 ${styles.glass} ${styles.zoomEffect} md:p-6 flex flex-col justify-center items-center`}>
              <div className={`text-2xl font-bold mb-4 ${styles.hoverEffect}`}>
                Ayurvedic Treatments and Comfort
              </div>
              <p className={styles.hoverEffect}>
                Step into the tranquil world of Ayurvedic treatments and experience the pinnacle <br />
                of comfort and relaxation. Our spa offers a diverse range of holistic treatments <br />
                and services, all designed to ensure your well-being. From traditional Ayurvedic <br />
                therapies to modern spa experiences, you'll find a variety of treatments that cater <br />
                to your unique preferences. Each visit to our spa is a chance to immerse yourself <br />
                in the soothing world of Ayurveda, where wellness and comfort go hand in hand.
              </p>
            </div>

            {/* Section 3 */}
            <div className={`p-4 ${styles.glass} ${styles.zoomEffect} md:p-6 flex flex-col justify-center items-center`}>
              <div className={`text-2xl font-bold mb-4 ${styles.hoverEffect}`}>
                Ayurvedic Treatment Types at Our Spa
              </div>
              <p className={styles.hoverEffect} >
                Explore the vast array of Ayurvedic treatment types available at our spa.    <br />
                From the gentle strokes of an Ayurvedic massage to the rejuvenating effects  <br />
                of body treatments, we have something for everyone. Dive into the rich       <br />
                heritage of Ayurveda and experience therapiesthat have stood the test of     <br />
                time. Whether you seek relaxation, rejuvenation, or a specific wellness goal,<br />
                our spa offers treatments that cater to your individual preferences.         <br />
                Discover the world of Ayurvedic wellnessand embark on a journey towards      <br />
                holistic well-being.
              </p>
            </div>
            <div className="p-4">
              <img src={homeImage3} alt="Spa 3" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
