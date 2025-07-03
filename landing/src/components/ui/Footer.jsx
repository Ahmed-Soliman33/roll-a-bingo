import {
  EnvelopeIcon,
  PhoneIcon,
  InformationCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import logo from "/logo.webp";
import { NavLink } from "react-router-dom";

const footerLinks = [
  [
    { label: "About us", path: "/about" },
    { label: "Contact us", path: "/contact" },
    { label: "Packages", path: "/Packages" },
    { label: "KYC & AML policy", path: "#" },
    { label: "Service accessibility", path: "#" },
  ],
  [
    { label: "Privacy policy", path: "#" },
    { label: "Refund policy", path: "#" },
    { label: "Terms and conditions", path: "#" },
    { label: "Legal disclaimer", path: "#" },
    { label: "Copyrights", path: "#" },
  ],
];

const Footer = () => (
  <footer className="bg-primaryColor relative w-full overflow-hidden px-8 pt-16 pb-28 text-white md:px-0">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:gap-0">
      {/* Left: Logo & Contact & Social */}
      <div className="flex min-w-[220px] flex-1 flex-col gap-4 pl-12 md:max-w-[60%]">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
          <div>
            <NavLink to="/">
              <img
                src={logo}
                alt="Startify logo"
                className="mb-2 h-16 w-44"
                style={{ filter: "brightness(0) invert(1)" }} // Ensure white logo on dark background
              />
            </NavLink>
            <div className="mb-2 text-white/90">Powering entrepreneurs up!</div>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-white" />
                <span>Support@startify.com</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-white" />
                <span>+1 (507) 410-4666</span>
              </div>
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-white" />
                <span>Helpdesk articles</span>
              </div>
              <div className="flex items-center gap-2">
                <InformationCircleIcon className="h-5 w-5 text-white" />
                <span>FAQ</span>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-xl transition-colors hover:text-[var(--color-yellowColor)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path d="M25 3C12.9 3 3 12.9 3 25c0 11 8.1 20.1 18.7 21.7l1.1.2V29.6h-5.2v-3.5h5.2v-4.7c0-2.9.7-4.8 1.8-6 1.1-1.2 2.8-1.8 5.2-1.8 1.9 0 2.6.1 3.3.2v2.9h-2.4c-1.4 0-2.5.8-3 1.7-.5.9-.7 2.1-.7 3.3v4.7h6.1l-.5 3.5h-5.6v17.4l1.1-.2C38.7 45.3 47 36.1 47 25c0-12.1-9.9-22-22-22z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-xl transition-colors hover:text-[var(--color-yellowColor)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path d="M5.9 6l14.7 21.4L6.2 44h3.2L22 29.4 32 44h12l-15.3-22.3L42.2 6h-3.2L27.3 19.6 17.9 6H5.9z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-xl transition-colors hover:text-[var(--color-yellowColor)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  className="h-6 w-6 text-white"
                >
                  <path d="M16 3C8.8 3 3 8.8 3 16v18c0 7.2 5.8 13 13 13h18c7.2 0 13-5.8 13-13V16c0-7.2-5.8-13-13-13H16zm0 2h18c6.1 0 11 4.9 11 11v18c0 6.1-4.9 11-11 11H16c-6.1 0-11-4.9-11-11V16c0-6.1 4.9-11 11-11zm21 6a2 2 0 100 4 2 2 0 000-4zm-12 3c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm0 2c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center gap-8 md:flex-row md:gap-16">
            <ul className="flex min-w-[180px] flex-col gap-2">
              {footerLinks[0].map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    className="text-base text-white/90 transition-colors hover:text-[var(--color-yellowColor)]"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="flex min-w-[180px] flex-col gap-2">
              {footerLinks[1].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base text-white/90 transition-colors hover:text-[var(--color-yellowColor)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom: Copyright & Disclaimer */}
        <div className="mx-auto mt-10 text-xs text-white/70 md:min-w-3xl">
          <div className="mb-2">© 2019-2025 All rights reserved.</div>
          <p>
            Privatily is not a law firm nor can provide legal advice. We
            specialize in providing tech-based business services and insightful
            guidance for general understanding. The information on our website,
            as well as that shared via emails, WhatsApp, Slack, SMS, Zoom,
            social media, and other communication platforms, is for
            informational purposes only and should not be taken as legal advice.
            By using our services and accessing our website, you agree to our
            Terms of Service, Privacy Policy, and Data Processing Addendum.
          </p>
        </div>
      </div>
      {/* Center: Links */}
      <div className="hidden w-[38vw] max-w-[420px] lg:block">
        <img
          src={"/images/footer.png"}
          alt="man with laptop"
          className="h-auto w-full object-contain"
          width={420}
          height={420}
        />
      </div>
    </div>

    {/* Decorative image right side */}
  </footer>
);

export default Footer;
