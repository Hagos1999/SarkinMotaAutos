// Type declarations for third-party Web Components used in this project

declare namespace JSX {
  interface IntrinsicElements {
    // Google model-viewer Web Component
    // https://modelviewer.dev/
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      "auto-rotate"?: boolean | string;
      "camera-controls"?: boolean | string;
      "shadow-intensity"?: string;
      "environment-image"?: string;
      exposure?: string;
      poster?: string;
      ar?: boolean | string;
      "ar-modes"?: string;
    };
  }
}
