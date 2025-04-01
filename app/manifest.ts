import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LifeAndMedTech Accelerate",
    short_name: "LMT Accelerate",
    description: "Collaborative platform for LifeAndMedTech team members",
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e1e",
    theme_color: "#ff5722",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

