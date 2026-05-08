const setScreenSize = (width) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
};

export { setScreenSize };
