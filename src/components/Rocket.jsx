import { motion } from "framer-motion";

export default function Rocket() {
  return (
    <motion.div
      className="absolute right-10 bottom-40 text-6xl"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      🚀
    </motion.div>
  );
}
