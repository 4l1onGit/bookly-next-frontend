import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t py-2 max-w-7xl mx-auto px-4">
      <p className="text-center text-sm text-muted-foreground py-4">
        &copy; {new Date().getFullYear()} Bookly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
