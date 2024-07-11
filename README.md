# Defog's UI components


## Usage

Because this isn't a published library, the intended usage currently is as a git submodule. To set that up in your repo, do:
1. `git submodule add https://github.com/defog-ai/ui-components`

This will cause the folder to be added as a submodule and also your .gitmodules to be created/updated in your repo.

## Developing/Testing
All component source files live inside `lib/`.

To "Test" this folder aka actually see your components, the stuff is inside `test/`

Test locally using the following commands in project root:
1. `npm i`
2. `npm run dev`
3. Open `localhost:5173/` in your browser


Now you can go into `test/App.jsx` to see your components! Any changes you make to your code inside `lib/` will be reflected immediately.

When done with improvements/edits, push to this repo and (maybe) notify others that they would need to run `git submodule update --init --recursive` in their repos in case they're using this code.
