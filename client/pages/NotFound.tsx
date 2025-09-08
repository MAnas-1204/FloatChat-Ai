import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-extrabold mb-2">404</h1>
        <p className="text-lg text-foreground/70 mb-6">The page you are looking for could not be found.</p>
        <a href="/" className="inline-flex items-center rounded-full bg-gradient-to-r from-brand-aqua-start to-brand-aqua-end px-6 py-3 text-sm font-semibold text-white drop-shadow-glow">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
