# Bingo Tournament Website

Now that the tournament is over, you can view the static website with the results at https://xwmtp.github.io/bingo2023

## Install

On [Github.com](https://github.com), go to `Settings` -> `Developer Settings` -> `Personal access tokens`.
Create a new Personal access token with the scopes `repo` and `read:packages`.
Run

```bash
npm login --scope=@xwmtp --registry=https://npm.pkg.github.com
```

to log in. Use the created access token as the password.

Then run

```bash
npm install
```

## Run

```bash
npm start
```

