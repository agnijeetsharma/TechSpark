
import { useLogin } from "../utils/LoginContext";

const FrontPage = () => {
  const { setLoginVisible } = useLogin();
  const { isLoginVisible } = useLogin();
  return (
    <div className="min-h-screen bg-base-200 -mt-16">
    <section className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white">
    { !isLoginVisible&&<div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-extrabold">Welcome to TechSpark</h1>
            <p className="py-6 text-lg">
              Connect with the brightest minds in tech. Share, learn, and grow
              together.
            </p>
            <button
              className="btn btn-primary text-white font-bold text-lg rounded-full px-6 py-3 transition-transform transform hover:scale-105"
              onClick={() => setLoginVisible(true)}
            >
              Get Started
            </button>
          </div>
        </div>}
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-12 text-primary">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="card w-96 bg-base-200 text-base-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Collaborate</h2>
                <p>
                  Join forces with developers and IT professionals from all over
                  the world.
                </p>
              </div>
            </div>

            <div className="card w-96 bg-base-200 text-base-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Learn</h2>
                <p>
                  Access a wealth of tutorials, guides, and projects to expand
                  your knowledge.
                </p>
              </div>
            </div>

            <div className="card w-96 bg-base-200 text-base-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Network</h2>
                <p>
                  Connect with like-minded professionals and take your career to
                  the next level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
