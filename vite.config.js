import { defineConfig } from 'vite';

export default defineConfig({
  // Other Vite configuration options...
  server: {
    // Serve files from the "public" directory
    // Adjust the path if your static assets are located elsewhere
    fs: {
      strict: false // Allow serving files without extensions
    }
  }
});
