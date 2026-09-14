import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  turbopack: {
    root: dirname(dirname(dirname(fileURLToPath(import.meta.url)))),
  },
}

export default nextConfig
