# Continue React App

The Continue React app is a notebook-like interface to the Continue server. It allows the user to submit arbitrary text input, then communicates with the server to takes steps, which are displayed as a sequence of editable cells. The React app should sit beside an IDE, as in the VS Code extension.

## Build System

This project uses [Rspack](https://www.rspack.dev/) as the build tool for faster compilation and improved development experience. The configuration is located in `rspack.config.cjs`.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:check` - Build with TypeScript type checking
- `npm run preview` - Preview the production build
- `npm run test` - Run tests

### Migration from Vite

This project was migrated from Vite to Rspack. The previous Vite configuration is preserved as `vite.config.ts.bak` for reference.
