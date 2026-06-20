<a id="readme-top"></a>

<div align="center">
  <a href="https://github.com/vinsonio0920/blog-api">
    <img width="80" height="80" alt="crosshair-svgrepo-com" src="https://github.com/user-attachments/assets/39648cda-21d6-4f3c-9111-fb24be41ca84" />
  </a>

  <h3 align="center">Sniper</h3>
  <p align="center">
    A photo tagging app where users are tasked to find a hidden object in a picture.
    <br />
  </p>
</div>

# wheres-waldo

A recreation of the iconic Where's Waldo game on the web. The user is tasked with a list of targets to find and will be timed on their completion. There will also be a leaderboard to compare against the top players for each mission.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction-to-the-website">Introduction to the website</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li>
          <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgements">Acknowledgments</a></li>
  </ol>
</details>

## Introduction to the Website

This frontend part of the fullstack Where's Waldo project is where users are able to play missions, find targets, and compare their time on the leaderboard. Built with React, the single page applicat seamlessly integrates with the backend to provide the latest data while providing security since the validation is situated in the backend. All in all, it's a pretty simple frontend that gives a good UI for the users to have fun finding targets and reaching high scores!

Some features of this website are:
* Up-to-date data on missions, targets, and leaderboard entries
* Intuitive UI
* Mobile screen support
* Leaderboard to compare your time against others
* Support for multiple targets
* And more!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
* [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
* [![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
* [![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](#)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To build on top of this project, follow the steps below to set up the project in your local environment!

### Prerequisites

* Make sure your package manager is updated to the latest version
  
  ```sh
  npm install npm@latest -g
  ```

* Install all dependencies

  ```sh
  npm install
  ```

* Set up the [backend](https://github.com/vinsonio0920/wheres-waldo-backend) and copy the server url. Make sure to copy your API's url!

### Installation

Before continuing, fork and clone the repository into your local environment!

1. Create an `.env` file in the `src` directory and add the following variables

  ```sh
  VITE_SERVER_URL=<your server url>
  ```

3. Run the application

  ```sh
  npm run dev
  ```

And you're done! Feel free to look around the website and maybe play some of the games! For deploying your project to Github Pages, you should first update the `homepage` in `package.json` to your repository link and simply run the following:

  ```sh
  npm run deploy
  ```

This will deploy your project to github pages and you will be able to share that link with your friends.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Usage

<img width="1506" height="1013" alt="Image of the website homepage" src="https://github.com/user-attachments/assets/38bb5cc8-e0e4-4290-ae02-612a47340c3e" />
<p align="center">
  <a href="https://vinsonblogs.netlify.app/](https://vinsonio0920.github.io/wheres-waldo/#/">Visit the website</a>
</p>

Do note that the website runs on Render's free plan, meaning you will get a blank page. Please wait for a minute to let the backend start up and refresh.

The website is quite intuitive, maybe a bit lacking in the extra features and polish that makes the website pop. The user begins in the homepage where there is a list of missions along with the targets for each one. Once a mission is clicked, it shows the mission's title and the image to find the targets. Simply click anywhere on the image to show the target dropdown with the target options. There is also a result element to tell the users about the results of their click.

Once every target has been found, a completion modal will show up with the time taken and rank for the mission. The user can then enter their name to submit the score or skip it entirely to go back to the homepage. Right now there are only 3 missions to play from, but I plan on adding more in the future. I hope you have fun playing these missions!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

While the core functionalities and features of this website are all there, many polish and quality of life features could be added to make the website more fun and accessible. Some of these includes:

- [ ] Add image for targets
- [ ] Count numbers of snipes taken
- [ ] Add leaderboard filtering/sorting option
- [ ] Add sound effects
- [ ] Add x marks just like checkmarks
- [ ] Already found result para

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License 

Distributed under the GNU Affero General Public License v3.0 license. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgements

Along with the major frameworks and libraries, there are also some smaller libraries and packages that I would like to give a shoutout to. Before we begin, I'm going to just shoutout StackOverflow and The Odin Project for helping me get here!

* [date-fns](https://date-fns.org/) - This date formatter has never failed me. It's also quite intuitive and easy to use straight out the box
* [React Github Pages guide](https://stackoverflow.com/questions/69708281/how-can-i-host-my-react-application-using-github) - This was the guide I used to deploy my React project to Github pages
* [Prettier](https://prettier.io/) - Prettier is goated, especially when it comes to formatting code. It really saves a lot of time worrying about writing code beautifully because Prettier handles it for us.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
