import '@mui/material';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    navbar: CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    myBlack?: PaletteColorOptions;
  }

  interface Palette {
    myBlack: PaletteColor;
  }
}
