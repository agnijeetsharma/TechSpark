import {useSelector} from 'react'

const Landing=()=>{
   const isLoggedIn=useSelector(store=>store.user)

    return (
        <div>
        {!isLoggedIn ? (
          // Landing Page with Background
          <div
            className="flex items-center justify-center text-white"
            style={{
              backgroundImage: `url('./assets/bg.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
            }}
          >
            <div className="text-center">
              <h1 className="text-5xl font-bold">Welcome to TechSpark</h1>
              <button
                // onClick={handleLogin}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          // Main Application Content After Login
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">Welcome Back, User!</h1>
          </div>
        )}
      </div>
    )
}
export default Landing