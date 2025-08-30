export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["https://cdn.ckeditor.com"],
          "connect-src": ["https://proxy-event.ckeditor.com"],
          "default-src": ["https://www.youtube.com"],
          "frame-src": ["https://www.youtube.com"],
        },
        editor: {
          mediaEmbed: {
            previewsInData: true,
          },
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  {
    name: "global::sanitize-null-password",
    config: {},
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
