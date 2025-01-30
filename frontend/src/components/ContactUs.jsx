import  { useState } from 'react';

const ContactUs = () => {
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }
    
    
    setError('');

   
    try {
      console.log('Form submitted', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); 
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className=" min-h-screen mt-24">
    
      <div className="flex justify-center items-center py-8 text-base-content">
        <div className=" shadow-lg rounded-lg w-full max-w-xl p-8 bg-base-300">
          <h2 className="text-3xl font-semibold text-center text-primary mb-6">Contact Us</h2>
          <p className="text-center text-gray-500 mb-4">Have any questions or need assistance? We're here to help!</p>

         
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {isSubmitted && !error && <p className="text-green-500 text-center mb-4">Thank you for contacting us!</p>}

         
          <form onSubmit={handleSubmit} className="space-y-4 bg-base-300">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text text-gray-700">Your Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text text-gray-700">Your Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="message" className="label">
                <span className="label-text text-gray-700">Your Message</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </div>
          </form>

        
          <div className="text-center mt-8 text-gray-600">
            <p>Or reach us directly at:</p>
            <p>Email: <a href="mailto:support@techspark.com" className="text-blue-500">support@techspark.com</a></p>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ContactUs;
