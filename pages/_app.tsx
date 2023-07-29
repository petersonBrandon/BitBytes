import { Footer, NavBar } from "../components";
import "../styles/globals.css";
import "../styles/prism-atom-dark.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useEffect } from "react";
import ParticleEffect from "../components/Particles";
import { FormControlLabel, Switch } from "@mui/material";
import { getAnalytics, logEvent } from "firebase/analytics";
import { firebaseApp } from "../firebase";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [particlesEnabled, setParticlesEnabled] = React.useState(true);

  useEffect(() => {
    const analytics = getAnalytics(firebaseApp);
    logEvent(analytics, "site_view");
    logEvent(analytics, `page_view_${router.route}`);
    console.log(
      `LOG: Site Viewed (site_view)\nPage Viewed (page_view_${router.route}): ${router.route}`
    );
  }, []);

  return (
    <AnimatePresence mode="wait" presenceAffectsLayout={false}>
      <motion.div key={router.route} className="text-white font-sans">
        <motion.div>
          <NavBar />
        </motion.div>
        <div className="mt-20 left-0 fixed z-30 w-screen flex flex-row justify-center items-center max-lg:relative max-lg:pt-24 max-lg:mt-0">
          <div className="w-4/5 flex justify-end">
            <FormControlLabel
              value="particles"
              control={
                <Switch
                  checked={particlesEnabled}
                  onChange={() => setParticlesEnabled(!particlesEnabled)}
                  color="default"
                />
              }
              label="Particles"
              labelPlacement="start"
            />
          </div>
        </div>
        {particlesEnabled ? (
          <div className="fixed">
            <ParticleEffect />
          </div>
        ) : (
          <></>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.75 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="z-0 pt-20 max-lg:pt-0"
        >
          <Component {...pageProps} />
          <Footer />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
