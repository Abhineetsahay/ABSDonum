import { forwardRef } from "react";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = forwardRef(function Contact(props, ref) {
  return (
    <footer
      ref={ref}
      id="contact"
      className="w-full bg-[#1a0f12] text-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="Donum" className="h-8 w-8" />
              <span className="text-xl font-jakarta font-bold">DONUM</span>
            </div>

            <p className="text-sm font-poppins text-zinc-300 leading-relaxed max-w-sm">
              Donum creates personalized gifts that turn memories into
              meaningful keepsakes — crafted with care and intention.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-jakarta font-semibold mb-4">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm font-poppins text-zinc-300">
              <div className="flex items-center gap-3">
                <a
                  href="mailto:thedonumstore@gmail.com"
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <Mail size={16} />
                  <span>thedonumstore@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="tel:+917504985013"
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <Phone size={16} />
                  <span>+91 7504985013</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-jakarta font-semibold mb-4">
              Follow Us
            </h4>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/_.donum"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/donumm/posts/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-zinc-400 font-poppins">
          © {new Date().getFullYear()} Donum. All rights reserved.
        </div>
      </div>
    </footer>
  );
});

export default Footer;
