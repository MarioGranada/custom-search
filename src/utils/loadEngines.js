const enginesData = {
  engines: {
    google: {
      queryParams: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        cx: import.meta.env.VITE_GOOGLE_CX
      },
      headers: {}
    }
  }
};

export default enginesData;
