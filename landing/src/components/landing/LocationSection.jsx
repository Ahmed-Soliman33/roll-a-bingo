import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const locations = [
  "Wildwood Boardwalk, NJ",
  "Castle Rock, CO",
  "Santa Cruz Boardwalk, CA",
  "Scene 75 Milford, OH",
  "Scene 75 Cincinnati, OH",
];

const hours = [
  { day: "Mon", time: "11:00 am – 08:00 pm" },
  { day: "Tue", time: "11:00 am – 08:00 pm" },
  { day: "Wed", time: "11:00 am – 08:00 pm" },
  { day: "Thu", time: "11:00 am – 08:00 pm" },
  { day: "Fri", time: "11:00 am – 10:00 pm" },
  { day: "Sat", time: "11:00 am – 10:00 pm" },
  { day: "Sun", time: "11:00 am – 08:00 pm" },
];

const LocationSection = () => {
  return (
    <section
      id="location"
      className="relative z-10 w-full bg-[var(--color-blackColor)] px-6 py-24 text-white sm:px-8 md:px-16 lg:px-32"
    >
      <div className="from-tertiaryColor/20 pointer-events-none absolute inset-0 top-[-5%] -z-10 bg-gradient-to-bl via-transparent to-transparent blur-2xl" />

      <div className="mb-16 flex flex-col gap-16 lg:flex-row">
        {/* Left: Text Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full space-y-6 lg:w-1/2"
        >
          <h2
            className="text-3xl font-extrabold text-[var(--color-yellowColor)] sm:text-4xl lg:text-5xl"
            style={{
              textShadow: "0 0 6px var(--color-tertiaryColor)",
            }}
          >
            Our Locations
          </h2>

          <div className="space-y-1 text-[.8rem] text-white/80 sm:text-base">
            {locations.map((loc, i) => (
              <p key={i}>- {loc}</p>
            ))}
          </div>

          <div className="pt-6">
            <h3
              className="text-yellowColor text-lg font-semibold"
              style={{
                textShadow: "0 0 4px var(--color-tertiaryColor)",
              }}
            >
              ROLL-A-BINGO Location
            </h3>
            <div className="mt-2 space-y-2 text-[.8rem] text-white/80 sm:text-[.9rem]">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-yellowColor" />
                <span>205 4th Street, Castle Rock, Colorado 80104</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h3
              className="text-yellowColor text-lg font-semibold"
              style={{
                textShadow: "0 0 4px var(--color-tertiaryColor)",
              }}
            >
              Hours
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-y-1 text-[.8rem] text-white/80 sm:grid-cols-2 sm:text-[.9rem]">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="col-span-2 flex justify-start gap-4"
                >
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
              <div className="col-span-2 pt-2 text-sm text-red-300 italic">
                CLOSED MAJOR HOLIDAYS
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Embedded Map */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full overflow-hidden rounded-md shadow-lg lg:w-1/2"
        >
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.8307824389566!2d-104.85741862445672!3d39.37150127161466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c92571d23fb99%3A0x4e48cb3039a4d679!2s205%204th%20St%2C%20Castle%20Rock%2C%20CO%2080104!5e0!3m2!1sen!2sus!4v1686695052543!5m2!1sen!2sus"
              className="h-[300px] w-full border-none sm:h-[400px] lg:h-[500px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
