# PSNProfiles Extra

![License](https://img.shields.io/badge/License-AGPLv3-blue.svg)

This is an open source project to add additional features to PSNProfiles.com by creating a plugin for various browsers. I'm working on this project for personal purposes and it's my goal to learn how to create a browser extensions and NOT to imitate and/or create a copy of existing extensions.

## Current features

- Game page
  - Display linked guide information
- Trophy page
  - Load and display missing guide description
- Guide page
  - All list and table items are checkable, and will be saved
  - Load trophies from a different platform (eg. guide is for PS4 and you're playing the PS5 version)

## Screenshots

![Profile page](screenshots/profile-page.png)

![Trophy page](screenshots/trophy-page.png)

![Guide page](screenshots/guide-page.png)

## Build

See `package.json` or below. Replace `{browser}` with either `chrome`, `firefox` or `safari`:

- `npm run build-{browser}`

For development execute:

- `npm run watch-{browser}`
