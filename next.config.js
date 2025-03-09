/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  },
  images: {
    domains: [
      "github.com",
      "images.unsplash.com",
      "kolvaifhcynbfqnpmmds.supabase.co",
      "example.com",
    ],
  },
  transpilePackages: ["@react-three/drei", "three"],
};
