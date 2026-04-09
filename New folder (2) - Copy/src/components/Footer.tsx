import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-16">
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="text-xl">🍽️</span>
            <span className="font-display font-bold text-lg text-gradient">Food Express</span>
          </Link>
          <p className="text-sm text-muted-foreground font-body">Discover the best restaurants and food near you.</p>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-3">Explore</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Contact Us", to: "/contact" },
              { label: "Top Rated", to: "/" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary font-body transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-3">Company</h4>
          <ul className="space-y-2">
            {[
              { label: "About Us", to: "/about" },
              { label: "Careers", to: "/about" },
              { label: "Blog", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary font-body transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-3">Support</h4>
          <ul className="space-y-2">
            {[
              { label: "Help Center", to: "/contact" },
              { label: "Privacy Policy", to: "/contact" },
              { label: "Terms of Service", to: "/contact" },
              { label: "FAQs", to: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary font-body transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground font-body">
        © 2026 Food Express. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
