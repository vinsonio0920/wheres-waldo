const Attributions = () => {
  return (
    <>
      <h1>Attributions</h1>
      <p data-testid="attributions-para">
        All of the photos in this website was taken from the internet. I am
        currently not skilled enough (yet!) to make all these amazing photos!
        Besides that, not much else to say. I hope you enjoyed the website. The
        majority of this website's design was based on Where's Waldo? Play
        Online which I highly recommend. I've spent a good chunk of time playing
        all the levels in the website and had a lot of fun doing so. Now.. is
        the word count there yet?
      </p>
      <ul aria-label="Attributions list">
        <li>
          Snipe the gymnasts photo by u/outdoorschillguy on{" "}
          <a
            target="_blank"
            href="https://www.reddit.com/r/FindTheSniper/top"
            rel="noopener noreferrer"
          >
            Find the Sniper
          </a>
        </li>
        <li>
          Snipe the crocs photo by u/Ryparian on{" "}
          <a
            target="_blank"
            href="https://www.reddit.com/r/FindTheSniper/top/?t=year"
            rel="noopener noreferrer"
          >
            Find the sniper
          </a>
        </li>
        <li>
          Snipe the panda photo from{" "}
          <a
            target="_blank"
            href="https://brightside.me/articles/test-find-the-hidden-objects-in-these-15-images-797240/"
            rel="noopener noreferrer"
          >
            Brightside
          </a>
        </li>
      </ul>
    </>
  );
};

export { Attributions };
