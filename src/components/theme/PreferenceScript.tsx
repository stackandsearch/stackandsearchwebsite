import { MOTION_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/prefs/constants";

// Runs in <head> before the first paint. Applies the saved (or system) theme
// and motion preference so the page never flashes the wrong theme, and marks
// <html data-js> so CSS knows JavaScript is available. No network, no input.
const script = `(function(){var d=document.documentElement;var q=function(s){return window.matchMedia(s).matches};var g=function(k){try{return window.localStorage.getItem(k)}catch(e){return null}};d.setAttribute("data-js","");var t=g(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark"){t=q("(prefers-color-scheme: light)")?"light":"dark"}d.setAttribute("data-theme",t);var m=g(${JSON.stringify(MOTION_STORAGE_KEY)});if(m!=="on"&&m!=="paused"){m=q("(prefers-reduced-motion: reduce)")?"paused":"on"}d.setAttribute("data-motion",m)})();`;

export function PreferenceScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
