import React from "react";

/**
 * Footer Component
 *
 * Renders the website footer containing social media links and copyright info.
 *
 * Features:
 * - Links to LinkedIn, Facebook, and GitHub profiles (open in new tabs)
 * - Uses Font Awesome icons for social media branding
 * - Styled with Bootstrap classes for a dark background and centered white text
 *
 * @component
 * @returns JSX.Element
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div>
        <a
          href="https://www.linkedin.com/in/abram-gad-hanna/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://www.facebook.com/abram.gad.1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2"
          title="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://github.com/Abram1111"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2"
          title="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>
        <p className="mt-2 mb-0">&copy; 2025 Abram Gad</p>
      </div>
    </footer>
  );
};

export default Footer;
