import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        green: {
          "50": "#f3fdf2",
          "100": "#defcdf",
          "200": "#b9f8c0",
          "300": "#84f098",
          "400": "#48e06e",
          "500": "#20c554",
          "600": "#139a47",
          "700": "#148046",
          "800": "#156640",
          "900": "#13533a",
          "950": "#042f23",
        },
      },
    },
  },
};
