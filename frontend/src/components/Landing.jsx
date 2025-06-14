import { useLogin } from "../utils/LoginContext";

const FrontPage = () => {
  const { setLoginVisible, isLoginVisible } = useLogin();

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <section className="min-h-screen flex items-center justify-center px-4 border-b border-base-200">
        {!isLoginVisible && (
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
            <div className="space-y-6">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Welcome to <span className="text-primary">TechSpark</span>
                </h1>
                <p className="text-lg text-base-content/70">
                  A modern platform where developers connect, learn, and
                  collaborate.
                </p>
              </div>
              <div>
                <button
                  className="btn btn-primary px-6 py-3 text-lg  btn-outline  rounded-full"
                  onClick={() => setLoginVisible(true)}
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-6 shadow ">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                What Developers Say
              </h2>
              <div className="space-y-4 text-sm">
                <blockquote className="border-l-4 border-primary pl-4 italic">
                “It’s like LinkedIn, but built for developers—clean, practical, and full of tech-minded people.”
                  <br />
                  <span className="block font-medium mt-2 text-primary">
                    — ABHI
                  </span>
                </blockquote>
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  “TechSpark helped me meet engineers with similar goals. Highly
                  recommended!”
                  <br />
                  <span className="block font-medium mt-2 text-primary">
                    — Yash
                  </span>
                </blockquote>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="py-20 bg-base-100 border-t border-base-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Profile",
                desc: "Sign up, add skills, and showcase your work.",
              },
              {
                title: "Connect with Others",
                desc: "Find and follow developers with similar interests.",
              },
              {
                title: "Collaborate on Projects",
                desc: "Start or join real-world projects with your peers.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-base-200 p-6 rounded-lg shadow-sm border border-base-300"
              >
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-base-content/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-base-100 border-t border-base-200 ">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-primary mb-12">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Collaborate",
                desc: "Work with others on exciting open-source and tech projects.",
              },
              {
                title: "Learn",
                desc: "Read articles, tutorials, and share knowledge with the community.",
              },
              {
                title: "Network",
                desc: "Build your presence, grow your reach, and find new opportunities.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-base-200 border border-base-300 p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-base-content/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
