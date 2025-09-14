const fs = require("fs");
const path = require("path");
const { writeBuildTimestamp } = require("./scripts/utils");

// Check environment for sourcemap mode
const isDev = process.env.NODE_ENV === "development" || process.argv.includes("--mode=development");

const rspackConfig = {
  mode: isDev ? "development" : "production",
  entry: {
    extension: "./src/extension.ts",
  },
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
  },
  target: "node",
  externals: {
    vscode: "commonjs vscode",
    esbuild: "commonjs esbuild",
    "./xhr-sync-worker.js": "commonjs ./xhr-sync-worker.js",
    // External dependencies that can't be bundled
    "system-ca": "commonjs system-ca",
    "@sentry/node": "commonjs @sentry/node",
    "node-fetch": "commonjs node-fetch",
    "zod": "commonjs zod",
    "web-tree-sitter": "commonjs web-tree-sitter",
    "uuid": "commonjs uuid",
    "winston": "commonjs winston",
    "plist": "commonjs plist",
    "diff": "commonjs diff",
    "fastest-levenshtein": "commonjs fastest-levenshtein",
    "async-mutex": "commonjs async-mutex",
    "replicate": "commonjs replicate",
    "yaml": "commonjs yaml",
    "ignore": "commonjs ignore",
    "lru-cache": "commonjs lru-cache",
    "minimatch": "commonjs minimatch",
    "quick-lru": "commonjs quick-lru",
    "partial-json": "commonjs partial-json",
    "handlebars": "commonjs handlebars",
    "@mozilla/readability": "commonjs @mozilla/readability",
    "jsdom": "commonjs jsdom",
    "dotenv": "commonjs dotenv",
    "jinja-js": "commonjs jinja-js",
    "js-tiktoken": "commonjs js-tiktoken",
    "onnxruntime-node": "commonjs onnxruntime-node",
    "onnxruntime-web": "commonjs onnxruntime-web",
    "@shikijs/transformers": "commonjs @shikijs/transformers",
    "is-localhost-ip": "commonjs is-localhost-ip",
    "shiki": "commonjs shiki",
    "cheerio": "commonjs cheerio",
    "sqlite": "commonjs sqlite",
    "sqlite3": "commonjs sqlite3",
    "google-auth-library": "commonjs google-auth-library",
    "adf-to-md": "commonjs adf-to-md",
    "socket.io-client": "commonjs socket.io-client",
    "pg": "commonjs pg",
    "dbinfoz": "commonjs dbinfoz",
    "p-limit": "commonjs p-limit",
    "comment-json": "commonjs comment-json",
    "iconv-lite": "commonjs iconv-lite",
    "workerpool": "commonjs workerpool",
    "axios": "commonjs axios",
    "node-html-markdown": "commonjs node-html-markdown",
    "wink-nlp-utils": "commonjs wink-nlp-utils",
    "tar": "commonjs tar",
    "puppeteer-chromium-resolver": "commonjs puppeteer-chromium-resolver",
    "@huggingface/jinja": "commonjs @huggingface/jinja",
    // AWS SDK modules
    "@aws-sdk/client-bedrock-runtime": "commonjs @aws-sdk/client-bedrock-runtime",
    "@aws-sdk/credential-providers": "commonjs @aws-sdk/credential-providers",
    "@aws-sdk/client-s3": "commonjs @aws-sdk/client-s3",
    "@aws-sdk/s3-request-presigner": "commonjs @aws-sdk/s3-request-presigner",
    "@aws-sdk/client-sagemaker-runtime": "commonjs @aws-sdk/client-sagemaker-runtime",
    // GitHub
    "@octokit/rest": "commonjs @octokit/rest",
    // MCP SDK modules
    "@modelcontextprotocol/sdk/shared/auth.js": "commonjs @modelcontextprotocol/sdk/shared/auth.js",
    "@modelcontextprotocol/sdk/client/streamableHttp.js": "commonjs @modelcontextprotocol/sdk/client/streamableHttp.js",
    "@modelcontextprotocol/sdk/client/auth.js": "commonjs @modelcontextprotocol/sdk/client/auth.js",
    "@modelcontextprotocol/sdk/client/sse.js": "commonjs @modelcontextprotocol/sdk/client/sse.js",
    "@modelcontextprotocol/sdk/client/stdio.js": "commonjs @modelcontextprotocol/sdk/client/stdio.js",
    "@modelcontextprotocol/sdk/client/websocket.js": "commonjs @modelcontextprotocol/sdk/client/websocket.js",
    "@modelcontextprotocol/sdk/client/index.js": "commonjs @modelcontextprotocol/sdk/client/index.js",
    // Continue packages
    "@continuedev/fetch": "commonjs @continuedev/fetch",
    "@continuedev/config-yaml": "commonjs @continuedev/config-yaml",
    "@continuedev/config-types": "commonjs @continuedev/config-types",
    "@continuedev/terminal-security": "commonjs @continuedev/terminal-security",
    "@continuedev/openai-adapters": "commonjs @continuedev/openai-adapters",
    "@continuedev/llm-info": "commonjs @continuedev/llm-info",
    // Relative package imports
    "../../../packages/config-yaml/dist": "commonjs @continuedev/config-yaml",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                decorators: true,
              },
              target: "es2020",
              transform: {
                decoratorMetadata: true,
                legacyDecorator: true,
              },
            },
          },
        },
      },
      {
        test: /\.node$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap("ImportMetaUrlPlugin", (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: "ImportMetaUrlPlugin",
              stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            () => {
              // Handle import.meta.url for transformers.js compatibility
              // This replaces the esbuild inject/define mechanism
              for (const chunk of compilation.chunks) {
                for (const file of chunk.files) {
                  if (file.endsWith('.js')) {
                    const asset = compilation.assets[file];
                    let source = asset.source();
                    if (typeof source === 'string') {
                      // Replace import.meta.url references (only actual code, not in strings/comments)
                      source = source.replace(/\bimport\.meta\.url\b/g, 'importMetaUrl');
                      // Add importMetaUrl definition at the top
                      const importMetaUrlDef = `const importMetaUrl = typeof document === 'undefined' ? require('url').pathToFileURL(__filename).href : document.currentScript && document.currentScript.src || new URL('${file.replace(/'/g, "\\'")}', document.baseURI).href;\n`;
                      source = importMetaUrlDef + source;
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
        compiler.hooks.afterEmit.tap("OnEndPlugin", (compilation) => {
          if (compilation.errors.length > 0) {
            console.error("Build failed with errors:", compilation.errors);
            const errorMessages = compilation.errors.map(error => 
              typeof error === 'string' ? error : error.message || error.toString()
            ).join('\n');
            throw new Error(`Build failed with ${compilation.errors.length} error(s):\n${errorMessages}`);
          } else {
            try {
              // Create a simple stats object for compatibility
              const metafile = {
                inputs: {},
                outputs: {
                  "out/extension.js": {
                    bytes: fs.existsSync(path.resolve(__dirname, "out/extension.js")) 
                      ? fs.statSync(path.resolve(__dirname, "out/extension.js")).size 
                      : 0,
                  }
                }
              };
              
              // Ensure build directory exists
              const buildDir = path.resolve(__dirname, "build");
              if (!fs.existsSync(buildDir)) {
                fs.mkdirSync(buildDir, { recursive: true });
              }
              
              fs.writeFileSync(
                path.resolve(__dirname, "build/meta.json"),
                JSON.stringify(metafile, null, 2)
              );
            } catch (e) {
              console.error("Failed to write meta file", e);
            }
            console.log("VS Code Extension rspack build complete"); // used verbatim in vscode tasks to detect completion
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
    // Remove deprecated and invalid options
    asyncWebAssembly: false,
  },
};

module.exports = rspackConfig;