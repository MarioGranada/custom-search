const enginesData = {
  engines: {
    google: {
      queryParams: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        cx: import.meta.env.VITE_GOOGLE_CX
      },
      headers: {}
    },
    bing: {
      queryParams: {
        customconfig: import.meta.env.VITE_BING_CUSTOM_CONFIG_ID,
        mkt: 'en-US'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': import.meta.env.VITE_BING_SUBSCRIPTION_KEY
      }
    }
  }
};

export default enginesData;
