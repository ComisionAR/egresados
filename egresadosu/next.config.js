const { createSecureHeaders } = require("next-secure-headers");

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  }, 
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }, 
  {
    key: 'Cache-Control', 
    value: 'no-cache, no-store, private, must-revalidate, max-age=0, no-transform'
  
  } 
   
]; 
module.exports = {
  poweredByHeader: false,
  webpack5: false,
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
  
      return config
    }, 
    async headers() {
      return [
    { source: "/(.*)",
     headers:securityHeaders
    }]
  }
}