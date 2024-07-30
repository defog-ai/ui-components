# Defog's UI components

### Using this library

`npm i -S @defogdotai/ui-components`

```jsx
import { Button } from "@defogdotai/ui-components";

const App = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

# DEVELOPING

Notes:

1. Use jsdoc style tags for documenting your comopnents. Look inside `lib/components/Button.jsx` for a simple example. Look inside `lib/components/Message.jsx` or `lib/components/Table.jsx` for a more complex example.
2. Just fyi: This uses typescript to build types for easier coding in vscode. **You don't have to write typescript. The above jsdoc comments will also do the trick.** You won't have to worry about it as it's already included in the build command.

### Developing this library on its own

All component source files live inside `lib/`.

Test locally using the following commands in project root:

1. `npm i`
2. `npm run dev`
3. Open `localhost:5173/` in your browser

Now you can go into `test/main.jsx` to see your components! Any changes you make to your code inside `lib/` will be reflected immediately.

When done, you can run: `npm run build` to build the library.

To publish the library

### Developing this library, _while using this library in another project_

_Reason for this at the end._

First run: `npm i` in this folder.

Now, there's three things you need to do:

1. Whatever your main project is, inside of which you wish to import this library, you need to first `npm link` the `react` and `react-dom` libraries inside the _main project_:

```
cd path/to/your/main/project
npm link ./node_modules/react
npm link ./node_modules/react-dom
```

This will make the react and `react-dom` libraries inside your main project available to be linked to any other projects in your system.

2. Then you need to come back to this repo's folder, and use the above linked react and react dom as your dependencies:

```
cd path/to/this/repo
npm link react
npm link react-dom
```

This means that all the references to react and `react-dom` inside this repo will now point to the react and `react-dom` libraries inside your _main project_.

3. Then, similar to the above, we will make this library available to your main project:

```
cd path/to/this/repo
npm link
```

This will make this library available to be linked to any other projects in your system.

4. Finally, you need to link this library to your main project:

```
cd path/to/your/main/project
npm link @defogdotai/ui-components
```

## Why do we do the linking business?

If we let this repo use its own `react` and `react-dom` and not the one in the main project, we will have two instances of react and `react-dom` in the final build. This will lead to a lot of issues. The major issue is in using the exported hooks of this library. [Documented here in more detail by the react docs.](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html)

# Notes about building CSS files:

Building the CSS files for the library was leading to some tailwind conflicts when used inside a main project that also uses tailwind. We decided to build the css files, but not import them from the library's main file. This lets us develop in peace inside a main project that uses Tailwind, but also allows for importing the css files from the library if needed.

If you need to import the css files from the library, you can do so by importing the css files from the `dist/` folder.

```
import "@defogdotai/ui-components/dist/style.css";
```

```
npm i -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

Should be enough to get tailwind working in the whatever your main project is.
