import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#8eab92] h-64 text-white flex items-center justify-center flex-col gap-3 shadow-lg">
              <h1 className="text-5xl font-bold">About Us</h1>
              <h3 className="text-lg">
                <Link to="/" className="underline">Home</Link> / About
              </h3>
            </div>
      <div className="bg-white  py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              About NariSaree
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              NariSaree is your destination for beautifully handcrafted sarees
              that celebrate the elegance of Indian tradition with a modern
              touch.
            </p>
            <p className="text-gray-600 text-md mb-4">
              From luxurious silk to breezy cotton, our carefully curated
              collections are perfect for weddings, festivals, and everyday
              grace.
            </p>
            <p className="text-gray-600 text-md">
              Each piece is made with love by local artisans across India,
              ensuring quality, authenticity, and style. Join us in celebrating
              the spirit of womanhood—one saree at a time.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-photo/young-woman-posing-while-wearing-traditional-sari-garment_23-2149565170.jpg?t=st=1746956961~exp=1746960561~hmac=939d00088af4e5aed58bda74ef50f593bee1fbecadebf23b715ba0c8e32ca9c7&w=740"
              alt="Saree Collection"
              className="w-1/2 h-1/2 rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
