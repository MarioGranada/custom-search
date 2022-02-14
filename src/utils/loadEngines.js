const enginesData = {
  engines: {
    google: {
      queryParams: {
        key: process.env.REACT_APP_GOOGLE_API_KEY,
        cx: process.env.REACT_APP_GOOGLE_CX
      },
      headers: {}
    },
    bing: {
      queryParams: {
        customconfig: process.env.REACT_APP_BING_CUSTOM_CONFIG_ID,
        mkt: 'en-US'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_SUBSCRIPTION_KEY
      }
    }
  }
};

export default enginesData;
