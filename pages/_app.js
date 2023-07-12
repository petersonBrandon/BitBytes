import { Footer, NavBar } from "@/components";
import "@/styles/globals.css";
import "@/styles/prism-atom-dark.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" presenceAffectsLayout={false}>
      <motion.div key={router.route} className="text-white font-sans">
        <motion.div>
          <NavBar />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.75 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <Component {...pageProps} />
          <Footer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
