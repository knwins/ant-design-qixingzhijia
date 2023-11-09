export default {
  dev: {
    '/api/': {     
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https//api.fans365.net:8083',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
