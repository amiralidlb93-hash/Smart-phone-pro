# Smartphone Simulator Pro 📱

A smartphone simulator that runs in the browser, built with HTML, CSS and JavaScript (React + Tailwind + Framer Motion loaded from CDN).

It includes a lock screen, home screen and many working apps: Phone, Messages, Camera, Photos, Calculator, Clock, Notes, Music, Weather, Maps, Mail, Browser, Games (Snake, Memory, Tic-Tac-Toe), App Store, Tube (video app), AI Assistant and Settings.

## 🌐 Live Demo

👉 **https://USERNAME.github.io/phone-simulator/**

## Project Structure

```
smartphone-simulator/
├── index.html   # Page + CDN script loading
├── style.css    # Base styles
├── app.js       # All the app code (React / JSX)
└── README.md
```

## Notes

- An internet connection is required, since React, Framer Motion, Tailwind and Babel are loaded from CDNs.
- The first load can take a few seconds because Babel compiles `app.js` in the browser.
- For faster loading, the project can be pre-compiled with a build tool such as Vite.

## Tech Stack

- [React 18](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Babel Standalone](https://babeljs.io/docs/babel-standalone)

## License

This project is licensed under the [MIT License](LICENSE).
