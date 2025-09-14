const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const rspackConfig = {
  mode: isDev ? "development" : "production",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      type: "module",
    },
    clean: true,
    chunkFormat: "module",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
    },
    alias: {
      "@continuedev/config-yaml": path.resolve(
        __dirname,
        "../../packages/config-yaml/dist/index.js",
      ),
      "@continuedev/openai-adapters": path.resolve(
        __dirname,
        "../../packages/openai-adapters/dist/index.js",
      ),
      "@continuedev/config-types": path.resolve(
        __dirname,
        "../../packages/config-types/dist/index.js",
      ),
      "core": path.resolve(__dirname, "../../core"),
      "@continuedev/fetch": path.resolve(
        __dirname,
        "../../packages/fetch/dist/index.js",
      ),
      "@continuedev/llm-info": path.resolve(
        __dirname,
        "../../packages/llm-info/dist/index.js",
      ),
      "@continuedev/terminal-security": path.resolve(
        __dirname,
        "../../packages/terminal-security/dist/index.js",
      ),
      "react-devtools-core": path.resolve(__dirname, "stubs/react-devtools-core.js"),
      // Fix src/ path resolution
      "src": path.resolve(__dirname, "src"),
    },
  },
  target: "node18",
  externals: {
    // Only externalize native modules that cannot be bundled
    "@sentry/profiling-node": "module @sentry/profiling-node",
    "fsevents": "module fsevents",
    "./xhr-sync-worker.js": "module ./xhr-sync-worker.js",
    // Core dependencies that have issues when bundled
    "@mozilla/readability": "module @mozilla/readability",
    "jsdom": "module jsdom",
    "node-html-markdown": "module node-html-markdown",
    "yaml": "module yaml",
    "comment-json": "module comment-json",
    "dotenv": "module dotenv",
    "bufferutil": "module bufferutil",
    "utf-8-validate": "module utf-8-validate",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
                decorators: true,
              },
              target: "es2022",
              transform: {
                react: {
                  runtime: "automatic",
                  development: isDev,
                },
                decoratorMetadata: true,
                legacyDecorator: true,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap("ESModuleBannerPlugin", (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: "ESModuleBannerPlugin",
              stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            () => {
              // Add banner for ESM compatibility with CommonJS modules
              for (const chunk of compilation.chunks) {
                for (const file of chunk.files) {
                  if (file.endsWith('.js')) {
                    const asset = compilation.assets[file];
                    let source = asset.source();
                    if (typeof source === 'string') {
                      // Add createRequire banner for CommonJS compatibility
                      const banner = `import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\n`;
                      source = banner + source;
                      compilation.assets[file] = {
                        source: () => source,
                        size: () => source.length,
                      };
                    }
                  }
                }
              }
            }
          );
        });
      },
    },
    {
      apply(compiler) {
        compiler.hooks.afterEmit.tap("OnEndPlugin", (compilation, callback) => {
          if (compilation.errors.length > 0) {
            console.error("Build failed with errors:", compilation.errors);
            const errorMessages = compilation.errors.map(error => 
              typeof error === 'string' ? error : error.message || error.toString()
            ).join('\n');
            throw new Error(`Build failed with ${compilation.errors.length} error(s):\n${errorMessages}`);
          } else {
            try {
              // Write metafile for analysis
              const metafile = {
                inputs: {},
                outputs: {
                  "dist/index.js": {
                    bytes: fs.existsSync(path.resolve(__dirname, "dist/index.js")) 
                      ? fs.statSync(path.resolve(__dirname, "dist/index.js")).size 
                      : 0,
                  }
                }
              };
              
              fs.writeFileSync(
                path.resolve(__dirname, "dist/meta.json"),
                JSON.stringify(metafile, null, 2)
              );

              // Copy worker files needed by JSDOM
              const workerSource = path.resolve(__dirname, "node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js");
              const workerDest = path.resolve(__dirname, "dist/xhr-sync-worker.js");
              try {
                if (fs.existsSync(workerSource)) {
                  fs.copyFileSync(workerSource, workerDest);
                  console.log("✓ Copied xhr-sync-worker.js");
                }
              } catch (error) {
                console.warn("Warning: Could not copy xhr-sync-worker.js:", error.message);
              }

              // Create wrapper script with shebang
              fs.writeFileSync(path.resolve(__dirname, "dist/cn.js"), "#!/usr/bin/env node\nimport('./index.js');");

              // Make the wrapper script executable
              fs.chmodSync(path.resolve(__dirname, "dist/cn.js"), 0o755);

              // Calculate bundle size
              const bundleSize = fs.existsSync(path.resolve(__dirname, "dist/index.js"))
                ? fs.statSync(path.resolve(__dirname, "dist/index.js")).size
                : 0;
              console.log(
                `✓ Build complete! Bundle size: ${(bundleSize / 1024 / 1024).toFixed(2)} MB`,
              );
            } catch (e) {
              console.error("Failed to write meta file or post-process", e);
            }
            console.log("CLI rspack build complete");
          }
        });
      },
    },
  ],
  devtool: isDev ? "source-map" : false,
  optimization: {
    minimize: !isDev,
  },
  experiments: {
    outputModule: true,
  },
};

module.exports = rspackConfig;