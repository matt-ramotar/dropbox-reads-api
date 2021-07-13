[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/matt-ramotar/dropbox-reads-api">
    <img src="public/logo.png" alt="Logo" width="200" height="200">
  </a>

  <h1 align="center">Dropbox Reads</h3>
  <p align="center">
    Community for Dropboxers to learn, share knowledge, and grow by reading together
    <br />
    <br />
    <a href="https://github.com/matt-ramotar/dropbox-reads-api">View Demo</a>
    ·
    <a href="https://github.com/matt-ramotar/dropbox-reads-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/matt-ramotar/dropbox-reads-api/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prereqs">Prereqs</a></li>
        <li><a href="#ssh">SSH</a></li>
        <li><a href="#env">.env</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#manual-testing">Manual Testing</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
- [PRD](https://www.dropbox.com/scl/fi/7qrvxsus73rvccz35bagx/Hackweek-Dropbox-Reads.paper?dl=0&rlkey=4z8v8zdmcj4k7xuerg2yl8w8e)
- [Hackdash](https://app.dropboxer.net/hackdash/2021/projects/4199)

### Built With

* [TypeScript](https://www.typescriptlang.org/docs/)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/en/starter/installing.html)
* [Tsoa](https://tsoa-community.github.io/docs/getting-started.html)
* [TypeGraphQL](https://typegraphql.com/docs/introduction.html)
* [GraphQL](https://graphql.org/learn/)
* [Typegoose](https://typegoose.github.io/typegoose/docs/guides/quick-start-guide)
* [MongoDB](https://www.mongodb.com/basics/clusters)

<!-- GETTING STARTED -->
## Getting Started
### Prereqs
* ### [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

  ```sh
  npm install -g npm
  ```
* ### [homebrew](https://brew.sh/)

  ```sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

* ### [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

  ```sh
  brew install yarn
  ```

### SSH
1. [Generate a new SSH key and save as `id_ed25519_gh`. Don't overwrite your Dropbox `id_ed25519`!](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. Update your `ssh config`
  ```sh
  #### Place local modifications below this line ####

  Host *github.*
  IdentityFile ~/.ssh/id_ed25519_gh

  #### Place local modifications above this line ####
  ```

### `.env`
1. Use
```sh
NODE_ENV=development
PORT=5000
MONGODB_URI=<URI>
SECRET_OR_KEY=<SECRET OR KEY>
```

2. Request keys at [#dropbox-reads-api](https://dropbox.slack.com/archives/C028DPBR9H6)

### Installation

1. Clone the repo using SSH
   ```sh
   git@github.com:matt-ramotar/dropbox-reads-api.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Run start script
   ```sh
   yarn start
   ```

### Manual Testing

1. [Compass](https://www.mongodb.com/try/download/compass)
2. [Postman](https://www.postman.com/downloads/)

<!-- CONTRIBUTING -->
## Contributing

1. Follow `Getting Started` above
2. Create branch
   ```sh
   git checkout -b feature/<name>
   ```
3. Commit changes
   ```sh
   git commit -m Add feature
   ```
4. Push to branch
   ```sh
   git push origin feature/<name>
   ```
5. Open Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact
- [#dropbox-reads-api](https://dropbox.slack.com/archives/C028DPBR9H6)
- mramotar@dropbox.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/matt-ramotar/dropbox-reads-api.svg?style=for-the-badge
[contributors-url]: https://github.com/matt-ramotar/dropbox-reads-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/matt-ramotar/dropbox-reads-api.svg?style=for-the-badge
[forks-url]: https://github.com/matt-ramotar/dropbox-reads-api/network/members
[stars-shield]: https://img.shields.io/github/stars/matt-ramotar/dropbox-reads-api.svg?style=for-the-badge
[stars-url]: https://github.com/matt-ramotar/dropbox-reads-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/matt-ramotar/dropbox-reads-api.svg?style=for-the-badge
[issues-url]: https://github.com/matt-ramotar/dropbox-reads-api/issues
[license-shield]: https://img.shields.io/github/license/matt-ramotar/dropbox-reads-api.svg?style=for-the-badge
[license-url]: https://github.com/matt-ramotar/dropbox-reads-api/blob/master/LICENSE
