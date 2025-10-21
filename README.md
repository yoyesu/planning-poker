# PLANNING POKER

## Introduction
## How tun run Firebase Emulator
To run the Firebase Emulator, follow these steps:
1. Install the Firebase CLI if you haven't already. You can do this by running the following command:
   ```
   npm install -g firebase-tools
   ```
2. Navigate to your project directory in the terminal.
3. Login to the project using the command:
   ```
   firebase login
   ```
4. Initialize the Firebase project if you haven't done so already by running:
   ```
   firebase init emulators
   ```
5. Run the following command to start the Firebase Emulator:
   ```
   firebase emulators:start
   ```
   
## Deploying to Github pages
Build the project using the command:
```
npm run build
```
Commit the new dist to the main branch:
and then deploy to Github pages using the command:
```
git subtree push --prefix dist origin gh-pages
```