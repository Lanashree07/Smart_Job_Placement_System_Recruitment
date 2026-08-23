import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Smart Job Placement and Recruitment Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
