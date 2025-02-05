export const PAGES = [
  "workspace",
  "calendar",
  "cabinets",
  "stuff",
  "profile",
  "patients",
] as const;

export const USER_PAGES = ["calendar", "stuff", "profile", "patients"] as const;

export const OPENED_MENU_WIDTH = 200;
export const CLOSED_MENU_WIDTH = 65;

export const TOOTH_SVG_STYLE = {
  cursor: "pointer",
  stroke: "#000000",
  strokeWidth: "0.26458332px",
  strokeLinecap: "butt" as "butt" | "round" | "square",
  strokeLinejoin: "miter" as "miter" | "round" | "bevel",
  strokeOpacity: "0",
};

export const TOOTH_ZONES_STYLE = {
  stroke: "#000000",
  strokeWidth: "4.19999981",
  strokeLinecap: "butt" as "butt" | "round" | "square",
  strokeLinejoin: "miter" as "miter" | "round" | "bevel",
  strokeMiterlimit: 4,
  strokeDasharray: "none",
  strokeOpacity: 1,
  cursor: "pointer",
};

export const AUTH_TOKEN = "auth-token";
export const REFRESH_TOKEN = "refresh-token";
export const USER = "user";
export const WORKSPACE = "workspace";
export const LANGUAGE = "language";
