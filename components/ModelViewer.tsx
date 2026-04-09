"use client";

import React from "react";

interface Props {
  src: string;
  alt: string;
  isPlaceholder?: boolean;
}

// model-viewer is a Google Web Component — we cast it to bypass strict JSX type checking
// See: https://modelviewer.dev/
const ModelViewerElement = "model-viewer" as unknown as React.ElementType;

export default function ModelViewer({ src, alt, isPlaceholder }: Props) {
  return (
    <div className="w-full h-[560px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-inner border border-gray-700 overflow-hidden relative">
      {isPlaceholder && (
        <div className="absolute top-3 left-3 z-10 bg-black/50 text-white/70 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
          🔲 3D Model: Demo Mode — Admin can upload a real .glb file
        </div>
      )}
      <ModelViewerElement
        src={src}
        alt={alt}
        auto-rotate=""
        camera-controls=""
        shadow-intensity="1.5"
        environment-image="neutral"
        exposure="1"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      />
    </div>
  );
}
