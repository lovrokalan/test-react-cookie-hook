import { useState, useEffect } from "react";

const getItem = (key) =>
  document.cookie.split("; ").reduce((total, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, "");

const setItem = (key, value, numberOfDays) => {
  const now = new Date();
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
  document.cookie = `${key}=${value}; expires=${now.toUTCString()};`;
};

const useCookie = (key, defaultValue) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie);

  const updateCookie = (value, numberOfDays) => {
    setCookie(value);
    setItem(key, value, numberOfDays);
  };

  // ========= start GA ===========
  const [gaScriptTagWasCreated, setGaScriptTagWasCreated] = useState(false);
  const [gaIsLoaded, setGaIsLoaded] = useState(false);

  useEffect(() => {
    if (key === "allowGoogleAnalytics" && cookie && !gaScriptTagWasCreated) {
      console.log("yeet this shouldnt trigger", cookie);
      // no need to add async atribute to script as its enabled by default for dynamic scripts
      const gaScriptTag = document.createElement("script");
      gaScriptTag.src =
        "https://www.googletagmanager.com/gtag/js?id=G-2WHW7E8WPX";
      gaScriptTag.addEventListener("load", () => setGaIsLoaded(true));
      document.body.appendChild(gaScriptTag);
      setGaScriptTagWasCreated(true);
    }
  }, [key, cookie, gaScriptTagWasCreated]);

  useEffect(() => {
    console.log("yeet", gaIsLoaded);
    if (!gaIsLoaded) return;

    if (typeof window == "undefined") {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-2WHW7E8WPX");
  }, [gaIsLoaded]);
  // "G-2WHW7E8WPX"

  // ========= end GA ===========

  return [cookie, updateCookie];
};
export default useCookie;
