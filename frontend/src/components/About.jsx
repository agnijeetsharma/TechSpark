import Footer from "./Footer";

const About = () => {
  return (
    <div className="bg-base text-base-content-h-screen flex flex-col items-center px-6 py-10 mt-16">
      <div className="max-w-4xl  text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">
          About TechSpark
        </h1>
        <p className="text-lg mb-6">
          Welcome to <span className="font-semibold">TechSparkiii</span>, the
          ultimate platform for developers and tech enthusiasts. Our goal is to
          create a space where innovation, collaboration, and skill-building
          come together to help you succeed in the tech industry.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mt-10 max-w-5xl">
        <div className="flex-1 bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Our Mission
          </h2>
          <p className="text-base">
            At TechSpark, our mission is to connect talented individuals, foster
            knowledge sharing, and provide tools and resources to shape the next
            generation of tech leaders. We strive to inspire creativity and
            support learning for everyone in the IT community.
          </p>
        </div>
        <div className="flex-1 bg-base-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-3 text-blue-400">
            Our Vision
          </h2>
          <p className="text-base">
            To be the leading platform for developers, empowering them to
            innovate, collaborate, and achieve excellence. We aim to build a
            global network of tech professionals who thrive in a rapidly
            changing digital world.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-base-200 p-6 rounded-lg shadow-lg max-w-5xl">
        <h2 className="text-2xl font-semibold mb-3 text-blue-400">
          Why Choose TechSpark?
        </h2>
        <ul className="list-disc list-inside text-base">
          <li className="mb-2">
            A dedicated community of tech enthusiasts and professionals.
          </li>
          <li className="mb-2">
            Access to the latest tools, resources, and technologies.
          </li>
          <li className="mb-2">
            Opportunities to collaborate, innovate, and grow.
          </li>
          <li className="mb-2">
            A platform tailored for developers to showcase their skills and
            network.
          </li>
        </ul>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg ">
          Join TechSpark today and spark your innovation journey!
        </h3>
      </div>
      <div>
        <div className="divider"></div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
