import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import contactAnimation from "@animations/animation-contact.json";
import Lottie from "lottie-react";
import useEmailSender from "@/hooks/useEmailSender";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const { loading, submitted, sendEmail } = useEmailSender({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    sendEmail(formData, () => {
      setFormData({ name: "", email: "", message: "" });
    });
  };

  return (
    <section
      id="contact"
      className="bg-blackColor relative z-10 w-full overflow-hidden px-6 py-24 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="from-tertiaryColor/20 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tl via-transparent to-transparent blur-2xl" />

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-100 left-1/2 z-20 -translate-x-1/2 rounded-xl px-6 py-3 text-center text-black shadow-lg md:bottom-10"
          >
            <Lottie
              className="h-72 w-72 md:h-auto md:w-auto"
              animationData={contactAnimation}
              autoPlay
              loop={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mb-16 grid grid-cols-1 gap-16 md:grid-cols-2"
      >
        {/* Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6 text-white"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-[var(--color-yellowColor)] lg:text-5xl"
            style={{
              textShadow: "0 0 6px var(--color-tertiaryColor)",
            }}
          >
            Contact us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-white/70"
          >
            We're excited to hear from you! Reach out to discuss your event,
            project, or just say hello.
          </motion.p>

          <div className="space-y-4 text-sm">
            <a
              href="tel:7142697221"
              className="hover:text-yellowColor flex items-center gap-3"
            >
              <Phone
                className="mb-1 text-[var(--color-yellowColor)]"
                size={18}
              />
              <span>714-269-7221</span>
            </a>
            <a
              href="mailto:zach@zanigames.com"
              className="hover:text-yellowColor flex items-center gap-3"
            >
              <Mail className="text-[var(--color-yellowColor)]" size={18} />
              <span>zach@zanigames.com</span>
            </a>
            <a
              href="mailto:ally@zanigames.com"
              className="hover:text-yellowColor flex items-center gap-3"
            >
              <Mail
                className="mb-1 text-[var(--color-yellowColor)]"
                size={18}
              />
              <span>ally@zanigames.com</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-5"
        >
          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-full border bg-transparent px-5 py-3 text-white placeholder-white/70 transition outline-none ${
                errors.name
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-[var(--color-yellowColor)]"
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-full border bg-transparent px-5 py-3 text-white placeholder-white/70 transition outline-none ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-[var(--color-yellowColor)]"
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              rows="4"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-transparent px-5 py-3 text-white placeholder-white/70 transition outline-none ${
                errors.message
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-[var(--color-yellowColor)]"
              }`}
              required
            ></motion.textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="w-full text-center">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading}
              className="from-yellowColor to-tertiaryColor hover:text-secondaryColor text-primaryColor relative w-full cursor-pointer rounded-full border-2 bg-gradient-to-br px-6 py-3 leading-5 font-bold transition-all duration-300 hover:bg-transparent disabled:opacity-50"
            >
              <span className="relative z-10">
                {loading ? "Sending..." : "Send message"}
              </span>
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactSection;
