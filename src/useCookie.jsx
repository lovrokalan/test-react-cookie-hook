import { useState, useEffect } from "react";

// get cookie item by key
const getItem = (key) =>
  document.cookie.split("; ").reduce((total, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, "");

// set value to cookie item of key and add expiration date
const setItem = (key, value, daysToExpiration) => {
  const now = new Date();
  now.setTime(now.getTime() + daysToExpiration * 60 * 60 * 24 * 1000);
  document.cookie = `${key}=${value}; expires=${now.toUTCString()};`;
};

const useCookie = (key, defaultValue, GA_MEASUREMENT_ID) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie);

  const updateCookie = (value, daysToExpiration) => {
    setCookie(value);
    setItem(key, value, daysToExpiration);
  };

  // ========= START of code that handles injection of Google Analytics ===========
  const [gaScriptTagWasCreated, setGaScriptTagWasCreated] = useState(false);
  const [gaIsLoaded, setGaIsLoaded] = useState(false);

  useEffect(() => {
    // create script element for GA if current cooke key === "allowGoogleAnalytics" and its value is true
    if (key === "allowGoogleAnalytics") {
      if (cookie && !gaScriptTagWasCreated) {
        // no need to add async atribute to script as its enabled by default for dynamic scripts
        const gaScriptTag = document.createElement("script");
        gaScriptTag.id = "googleAnalyticsScript";
        gaScriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        gaScriptTag.addEventListener("load", () => setGaIsLoaded(true));
        document.body.appendChild(gaScriptTag);
        setGaScriptTagWasCreated(true);
      } else if (!cookie && gaScriptTagWasCreated) {
        document.getElementById("googleAnalyticsScript").remove();
        setGaScriptTagWasCreated(false);
      }
    }
  }, [key, cookie, gaScriptTagWasCreated, GA_MEASUREMENT_ID]);

  useEffect(() => {
    if (!gaIsLoaded) return;

    if (typeof window == "undefined") {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", GA_MEASUREMENT_ID);
  }, [gaIsLoaded, GA_MEASUREMENT_ID]);
  // ========= END of code that handles injection of Google Analytics ===========

  return [cookie, updateCookie];
};
export default useCookie;
