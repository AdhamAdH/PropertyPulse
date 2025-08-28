import { FaHandshake, FaLightbulb, FaUser } from "react-icons/fa";

const AboutUS = () => {
  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="bg-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About PropertyPulse
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Connecting renters and property owners with ease, trust, and
          innovation.
        </p>
      </section>

      {/* <!-- Mission Section --> */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          At PropertyPulse, our mission is to make property renting simple,
          transparent, and accessible for everyone. Whether you are a renter
          searching for the perfect home, or a property owner looking to connect
          with reliable tenants, we provide a platform that empowers you with
          the tools you need.
        </p>
      </section>

      {/* <!-- Values Section --> */}
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* <!-- Card 1 --> */}
          <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="w-fit mx-auto text-blue-600 text-5xl mb-4">
              <FaHandshake />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Trust</h3>
            <p className="text-gray-600">
              We build trust through secure and transparent processes. Every
              property listed on our platform is verified, ensuring safety and
              peace of mind for both renters and owners.
            </p>
          </div>
          {/* <!-- Card 2 --> */}
          <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="w-fit mx-auto text-blue-600 text-5xl mb-4">
              <FaLightbulb />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Innovation
            </h3>
            <p className="text-gray-600">
              We continuously innovate with smart tools and modern technology,
              offering a seamless rental experience from property discovery to
              secure payments and communication.
            </p>
          </div>
          {/* <!-- Card 3 --> */}
          <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
            <div className="w-fit mx-auto text-blue-600 text-5xl mb-4">
              <FaUser />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Community
            </h3>
            <p className="text-gray-600">
              Beyond transactions, we foster a strong community where people
              connect, share experiences, and find not just houses, but homes
              where they belong.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Call to Action --> */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Join Our Journey
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Whether you are renting your next home or listing your property,
          PropertyPulse is here to help you every step of the way.
        </p>
      </section>
    </>
  );
};
export default AboutUS;
