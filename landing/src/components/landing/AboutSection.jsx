import { motion } from "framer-motion";
import { Sparkles, Gift, PartyPopper } from "lucide-react";
import aboutContent from "@content/about.json";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-blackColor relative z-10 w-full overflow-hidden px-4 py-16 sm:px-6 md:px-10 lg:px-20 xl:px-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-secondaryTextColor group w-full md:max-w-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex flex-wrap items-center gap-3 text-3xl font-extrabold tracking-wide sm:text-4xl"
            style={{
              color: "var(--color-yellowColor)",
              fontFamily: "var(--font-backso)",
            }}
          >
            <Sparkles className="animate-bounce text-[var(--color-tertiaryColor)]" />
            About{" "}
            <span style={{ color: "var(--color-tertiaryColor)" }}>
              {aboutContent.heading.heading}
            </span>
          </motion.h2>

          {/* Animated Bar */}
          <div className="mb-6 h-1 w-20 rounded bg-[var(--color-yellowColor)] transition-all duration-500 ease-in-out group-hover:w-40 group-active:w-32" />

          <p
            className="mb-6 text-sm leading-relaxed italic transition-transform duration-300 hover:scale-[1.02] sm:text-base"
            style={{
              color: "var(--color-primaryTextColor)",
              textShadow: "0 0 2px var(--color-tertiaryColor)",
            }}
          >
            {aboutContent.heading.desc}
          </p>

          <h3
            className="mt-6 mb-2 flex items-center gap-2 text-lg font-bold transition duration-300 hover:translate-x-1 sm:text-xl"
            style={{
              color: "var(--color-yellowColor)",
              fontFamily: "var(--font-backso)",
            }}
          >
            <PartyPopper className="animate-wiggle text-[var(--color-tertiaryColor)]" />{" "}
            {aboutContent.birthday.heading}
          </h3>
          <p
            className="text-secondaryTextColor active:text-primaryTextColor hover:text-primaryTextColor mb-4 text-sm leading-relaxed italic transition-colors duration-500"
            style={{
              textShadow: "0 0 2px var(--color-tertiaryColor)",
            }}
          >
            {aboutContent.birthday.desc}
          </p>

          <h3
            className="mt-6 mb-2 flex items-center gap-2 text-lg font-bold transition duration-300 hover:translate-x-1 sm:text-xl"
            style={{
              color: "var(--color-yellowColor)",
              fontFamily: "var(--font-backso)",
            }}
          >
            <Gift className="animate-spin-slow text-[var(--color-tertiaryColor)]" />{" "}
            {aboutContent.gift.heading}
          </h3>
          <p
            className="text-secondaryTextColor active:text-primaryTextColor hover:text-primaryTextColor text-sm leading-relaxed transition-colors duration-500"
            style={{
              textShadow: "0 0 2px var(--color-tertiaryColor)",
            }}
          >
            {aboutContent.gift.desc}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full max-w-sm drop-shadow-2xl transition duration-500 ease-in-out hover:scale-105 sm:max-w-md"
        >
          <div className="overflow-hidden rounded-lg border border-white/10 shadow-xl">
            <img
              src={aboutContent.image}
              alt="Roll-A-Bingo Room"
              loading="lazy"
              className="h-auto w-full object-cover transition duration-500 ease-in-out hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Circle */}
      <div className="pointer-events-none absolute right-[-80px] bottom-[-100px] h-72 w-72 rounded-full bg-[var(--color-tertiaryColor)] opacity-30 blur-[120px]" />
    </section>
  );
};

export default AboutSection;
