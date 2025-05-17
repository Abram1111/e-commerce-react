import React from "react";

/**
 * ContactUs Component
 *
 * Displays a contact section including:
 * - Embedded Google Maps iframe showing store location
 * - Contact form with fields for Name, Email, Phone, and Message
 * - Contact info section with address, phone, and email details
 *
 * Form Behavior:
 * - On submission, prevents default behavior and shows a demo alert
 * - Placeholder for future actual form submission logic (e.g. API call)
 *
 * Layout:
 * - Responsive grid with map on left and form on right (on md+ screens)
 * - Contact info cards below the form/map section
 *
 * @component
 * @returns JSX.Element
 */
const ContactUs: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Message submitted! (This is just a demo.)");
  };

  return (
    <div id="contact" className="container-fluid py-5 grad-color">
      <div className="container bg-white rounded p-4">
        <h2 className="text-center mb-4 decorated-font">Contact Us</h2>
        <div className="row align-items-stretch">
          <div className="col-md-6 mb-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509198!2d144.9537363153157!3d-37.81627944201995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f8f8fd%3A0x2b0b9d25c6a088e7!2sTech%20Store!5e0!3m2!1sen!2sau!4v1614131261035!5m2!1sen!2sau"
              className="w-100 h-100"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen
              loading="lazy"
              title="Tech Store Location"
            ></iframe>
          </div>
          <div className="col-md-6 mb-3 form-info">
            <h4>Send Message</h4>
            <form className="h-100 d-flex flex-column" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input type="text" className="form-control" id="phone" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn text-white grad-color ">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="row mt-4 p-3 rounded info">
          <div className="col-md-4">
            <h5>
              <i className="fas fa-map-marker-alt me-2"></i>Address
            </h5>
            <p>123 Tech Street, City</p>
          </div>
          <div className="col-md-4">
            <h5>
              <i className="fas fa-phone me-2"></i>Phone
            </h5>
            <p>+1234567890</p>
          </div>
          <div className="col-md-4">
            <h5>
              <i className="fas fa-envelope me-2"></i>Email
            </h5>
            <p>support@techstore.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
