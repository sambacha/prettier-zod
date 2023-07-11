import { z } from "zod";

export const PrettierSchema = z.any().superRefine((x, ctx) => {
  const schemas = [
    z.record(z.any()).and(
      z.intersection(
        z.object({
          arrowParens: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("always")
                  .describe("Always include parens. Example: `(x) => x`"),
                z
                  .literal("avoid")
                  .describe("Omit parens when possible. Example: `x => x`"),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe(
              "Include parentheses around a sole arrow function parameter."
            )
            .default("always"),
          bracketSameLine: z
            .boolean()
            .describe(
              "Put > of opening tags on the last line instead of on a new line."
            )
            .default(false),
          bracketSpacing: z
            .boolean()
            .describe("Print spaces between brackets.")
            .default(true),
          cursorOffset: z
            .number()
            .int()
            .describe(
              "Print (to stderr) where a cursor at the given position would move to after formatting.\nThis option cannot be used with --range-start and --range-end."
            )
            .default(-1),
          editorconfig: z
            .boolean()
            .describe(
              "Whether parse the .editorconfig file in your project and convert its properties to the corresponding Prettier configuration. This configuration will be overridden by .prettierrc, etc."
            )
            .default(false),
          embeddedLanguageFormatting: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("auto")
                  .describe(
                    "Format embedded code if Prettier can automatically identify it."
                  ),
                z
                  .literal("off")
                  .describe("Never automatically format embedded code."),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe(
              "Control how Prettier formats quoted code embedded in the file."
            )
            .default("auto"),
          endOfLine: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("lf")
                  .describe(
                    "Line Feed only (\\n), common on Linux and macOS as well as inside git repos"
                  ),
                z
                  .literal("crlf")
                  .describe(
                    "Carriage Return + Line Feed characters (\\r\\n), common on Windows"
                  ),
                z
                  .literal("cr")
                  .describe(
                    "Carriage Return character only (\\r), used very rarely"
                  ),
                z
                  .literal("auto")
                  .describe(
                    "Maintain existing\n(mixed values within one file are normalised by looking at what's used after the first line)"
                  ),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe("Which end of line characters to apply.")
            .default("lf"),
          filepath: z
            .string()
            .describe(
              "Specify the input filepath. This will be used to do parser inference."
            )
            .optional(),
          htmlWhitespaceSensitivity: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("css")
                  .describe(
                    "Respect the default value of CSS display property."
                  ),
                z
                  .literal("strict")
                  .describe("Whitespaces are considered sensitive."),
                z
                  .literal("ignore")
                  .describe("Whitespaces are considered insensitive."),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe("How to handle whitespaces in HTML.")
            .default("css"),
          insertPragma: z
            .boolean()
            .describe(
              "Insert @format pragma into file's first docblock comment."
            )
            .default(false),
          jsxSingleQuote: z
            .boolean()
            .describe("Use single quotes in JSX.")
            .default(false),
          parser: z
            .union([
              z.literal("flow").describe("Flow"),
              z.literal("babel").describe("JavaScript"),
              z.literal("babel-flow").describe("Flow"),
              z.literal("babel-ts").describe("TypeScript"),
              z.literal("typescript").describe("TypeScript"),
              z.literal("acorn").describe("JavaScript"),
              z.literal("espree").describe("JavaScript"),
              z.literal("meriyah").describe("JavaScript"),
              z.literal("css").describe("CSS"),
              z.literal("less").describe("Less"),
              z.literal("scss").describe("SCSS"),
              z.literal("json").describe("JSON"),
              z.literal("json5").describe("JSON5"),
              z.literal("json-stringify").describe("JSON.stringify"),
              z.literal("graphql").describe("GraphQL"),
              z.literal("markdown").describe("Markdown"),
              z.literal("mdx").describe("MDX"),
              z.literal("vue").describe("Vue"),
              z.literal("yaml").describe("YAML"),
              z.literal("glimmer").describe("Ember / Handlebars"),
              z.literal("html").describe("HTML"),
              z.literal("angular").describe("Angular"),
              z.literal("lwc").describe("Lightning Web Components"),
              z.string().describe("Custom parser"),
            ])
            .describe("Which parser to use.")
            .optional(),
          pluginSearchDirs: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z.array(z.string()),
                z.literal(false).describe("Disable plugin autoloading."),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe(
              "Custom directory that contains prettier plugins in node_modules subdirectory.\nOverrides default behavior when plugins are searched relatively to the location of Prettier.\nMultiple values are accepted."
            )
            .default([]),
          plugins: z
            .array(z.string())
            .describe(
              "Add a plugin. Multiple plugins can be passed as separate `--plugin`s."
            )
            .default([]),
          printWidth: z
            .number()
            .int()
            .describe("The line length where Prettier will try wrap.")
            .default(80),
          proseWrap: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("always")
                  .describe("Wrap prose if it exceeds the print width."),
                z.literal("never").describe("Do not wrap prose."),
                z.literal("preserve").describe("Wrap prose as-is."),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe("How to wrap prose.")
            .default("preserve"),
          quoteProps: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("as-needed")
                  .describe(
                    "Only add quotes around object properties where required."
                  ),
                z
                  .literal("consistent")
                  .describe(
                    "If at least one property in an object requires quotes, quote all properties."
                  ),
                z
                  .literal("preserve")
                  .describe(
                    "Respect the input use of quotes in object properties."
                  ),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe("Change when properties in objects are quoted.")
            .default("as-needed"),
          rangeEnd: z
            .number()
            .int()
            .describe(
              "Format code ending at a given character offset (exclusive).\nThe range will extend forwards to the end of the selected statement.\nThis option cannot be used with --cursor-offset."
            )
            // TODO: This is a bug in zod, it should be possible to pass null
            // @ts-expect-error
            .default(null),
          rangeStart: z
            .number()
            .int()
            .describe(
              "Format code starting at a given character offset.\nThe range will extend backwards to the start of the first line containing the selected statement.\nThis option cannot be used with --cursor-offset."
            )
            .default(0),
          requirePragma: z
            .boolean()
            .describe(
              "Require either '@prettier' or '@format' to be present in the file's first docblock comment\nin order for it to be formatted."
            )
            .default(false),
          semi: z.boolean().describe("Print semicolons.").default(true),
          singleAttributePerLine: z
            .boolean()
            .describe("Enforce single attribute per line in HTML, Vue and JSX.")
            .default(false),
          singleQuote: z
            .boolean()
            .describe("Use single quotes instead of double quotes.")
            .default(false),
          tabWidth: z
            .number()
            .int()
            .describe("Number of spaces per indentation level.")
            .default(2),
          trailingComma: z
            .any()
            .superRefine((x, ctx) => {
              const schemas = [
                z
                  .literal("es5")
                  .describe(
                    "Trailing commas where valid in ES5 (objects, arrays, etc.)"
                  ),
                z.literal("none").describe("No trailing commas."),
                z
                  .literal("all")
                  .describe(
                    "Trailing commas wherever possible (including function arguments)."
                  ),
              ];
              const errors = schemas.reduce(
                (errors: z.ZodError[], schema) =>
                  ((result) =>
                    "error" in result ? [...errors, result.error] : errors)(
                    schema.safeParse(x)
                  ),
                []
              );
              if (schemas.length - errors.length !== 1) {
                ctx.addIssue({
                  path: ctx.path,
                  code: "invalid_union",
                  unionErrors: errors,
                  message: "Invalid input: Should pass single schema",
                });
              }
            })
            .describe(
              "Print trailing commas wherever possible when multi-line."
            )
            .default("es5"),
          useTabs: z
            .boolean()
            .describe("Indent with tabs instead of spaces.")
            .default(false),
          vueIndentScriptAndStyle: z
            .boolean()
            .describe("Indent script and style tags in Vue files.")
            .default(false),
        }),
        z.object({
          overrides: z
            .array(
              z
                .object({
                  files: z
                    .any()
                    .superRefine((x, ctx) => {
                      const schemas = [z.string(), z.array(z.string())];
                      const errors = schemas.reduce(
                        (errors: z.ZodError[], schema) =>
                          ((result) =>
                            "error" in result
                              ? [...errors, result.error]
                              : errors)(schema.safeParse(x)),
                        []
                      );
                      if (schemas.length - errors.length !== 1) {
                        ctx.addIssue({
                          path: ctx.path,
                          code: "invalid_union",
                          unionErrors: errors,
                          message: "Invalid input: Should pass single schema",
                        });
                      }
                    })
                    .describe("Include these files in this override."),
                  excludeFiles: z
                    .any()
                    .superRefine((x, ctx) => {
                      const schemas = [z.string(), z.array(z.string())];
                      const errors = schemas.reduce(
                        (errors: z.ZodError[], schema) =>
                          ((result) =>
                            "error" in result
                              ? [...errors, result.error]
                              : errors)(schema.safeParse(x)),
                        []
                      );
                      if (schemas.length - errors.length !== 1) {
                        ctx.addIssue({
                          path: ctx.path,
                          code: "invalid_union",
                          unionErrors: errors,
                          message: "Invalid input: Should pass single schema",
                        });
                      }
                    })
                    .describe("Exclude these files from this override.")
                    .optional(),
                  options: z
                    .object({
                      arrowParens: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("always")
                              .describe(
                                "Always include parens. Example: `(x) => x`"
                              ),
                            z
                              .literal("avoid")
                              .describe(
                                "Omit parens when possible. Example: `x => x`"
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe(
                          "Include parentheses around a sole arrow function parameter."
                        )
                        .default("always"),
                      bracketSameLine: z
                        .boolean()
                        .describe(
                          "Put > of opening tags on the last line instead of on a new line."
                        )
                        .default(false),
                      bracketSpacing: z
                        .boolean()
                        .describe("Print spaces between brackets.")
                        .default(true),
                      cursorOffset: z
                        .number()
                        .int()
                        .describe(
                          "Print (to stderr) where a cursor at the given position would move to after formatting.\nThis option cannot be used with --range-start and --range-end."
                        )
                        .default(-1),
                      editorconfig: z
                        .boolean()
                        .describe(
                          "Whether parse the .editorconfig file in your project and convert its properties to the corresponding Prettier configuration. This configuration will be overridden by .prettierrc, etc."
                        )
                        .default(false),
                      embeddedLanguageFormatting: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("auto")
                              .describe(
                                "Format embedded code if Prettier can automatically identify it."
                              ),
                            z
                              .literal("off")
                              .describe(
                                "Never automatically format embedded code."
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe(
                          "Control how Prettier formats quoted code embedded in the file."
                        )
                        .default("auto"),
                      endOfLine: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("lf")
                              .describe(
                                "Line Feed only (\\n), common on Linux and macOS as well as inside git repos"
                              ),
                            z
                              .literal("crlf")
                              .describe(
                                "Carriage Return + Line Feed characters (\\r\\n), common on Windows"
                              ),
                            z
                              .literal("cr")
                              .describe(
                                "Carriage Return character only (\\r), used very rarely"
                              ),
                            z
                              .literal("auto")
                              .describe(
                                "Maintain existing\n(mixed values within one file are normalised by looking at what's used after the first line)"
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe("Which end of line characters to apply.")
                        .default("lf"),
                      filepath: z
                        .string()
                        .describe(
                          "Specify the input filepath. This will be used to do parser inference."
                        )
                        .optional(),
                      htmlWhitespaceSensitivity: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("css")
                              .describe(
                                "Respect the default value of CSS display property."
                              ),
                            z
                              .literal("strict")
                              .describe(
                                "Whitespaces are considered sensitive."
                              ),
                            z
                              .literal("ignore")
                              .describe(
                                "Whitespaces are considered insensitive."
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe("How to handle whitespaces in HTML.")
                        .default("css"),
                      insertPragma: z
                        .boolean()
                        .describe(
                          "Insert @format pragma into file's first docblock comment."
                        )
                        .default(false),
                      jsxSingleQuote: z
                        .boolean()
                        .describe("Use single quotes in JSX.")
                        .default(false),
                      parser: z
                        .union([
                          z.literal("flow").describe("Flow"),
                          z.literal("babel").describe("JavaScript"),
                          z.literal("babel-flow").describe("Flow"),
                          z.literal("babel-ts").describe("TypeScript"),
                          z.literal("typescript").describe("TypeScript"),
                          z.literal("acorn").describe("JavaScript"),
                          z.literal("espree").describe("JavaScript"),
                          z.literal("meriyah").describe("JavaScript"),
                          z.literal("css").describe("CSS"),
                          z.literal("less").describe("Less"),
                          z.literal("scss").describe("SCSS"),
                          z.literal("json").describe("JSON"),
                          z.literal("json5").describe("JSON5"),
                          z
                            .literal("json-stringify")
                            .describe("JSON.stringify"),
                          z.literal("graphql").describe("GraphQL"),
                          z.literal("markdown").describe("Markdown"),
                          z.literal("mdx").describe("MDX"),
                          z.literal("vue").describe("Vue"),
                          z.literal("yaml").describe("YAML"),
                          z.literal("glimmer").describe("Ember / Handlebars"),
                          z.literal("html").describe("HTML"),
                          z.literal("angular").describe("Angular"),
                          z.literal("lwc").describe("Lightning Web Components"),
                          z.string().describe("Custom parser"),
                        ])
                        .describe("Which parser to use.")
                        .optional(),
                      pluginSearchDirs: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z.array(z.string()),
                            z
                              .literal(false)
                              .describe("Disable plugin autoloading."),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe(
                          "Custom directory that contains prettier plugins in node_modules subdirectory.\nOverrides default behavior when plugins are searched relatively to the location of Prettier.\nMultiple values are accepted."
                        )
                        .default([]),
                      plugins: z
                        .array(z.string())
                        .describe(
                          "Add a plugin. Multiple plugins can be passed as separate `--plugin`s."
                        )
                        .default([]),
                      printWidth: z
                        .number()
                        .int()
                        .describe(
                          "The line length where Prettier will try wrap."
                        )
                        .default(80),
                      proseWrap: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("always")
                              .describe(
                                "Wrap prose if it exceeds the print width."
                              ),
                            z.literal("never").describe("Do not wrap prose."),
                            z.literal("preserve").describe("Wrap prose as-is."),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe("How to wrap prose.")
                        .default("preserve"),
                      quoteProps: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("as-needed")
                              .describe(
                                "Only add quotes around object properties where required."
                              ),
                            z
                              .literal("consistent")
                              .describe(
                                "If at least one property in an object requires quotes, quote all properties."
                              ),
                            z
                              .literal("preserve")
                              .describe(
                                "Respect the input use of quotes in object properties."
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe(
                          "Change when properties in objects are quoted."
                        )
                        .default("as-needed"),
                      rangeEnd: z
                        .number()
                        .int()
                        .describe(
                          "Format code ending at a given character offset (exclusive).\nThe range will extend forwards to the end of the selected statement.\nThis option cannot be used with --cursor-offset."
                        )
                        // TODO
                        // @ts-expect-error
                        .default(null),
                      rangeStart: z
                        .number()
                        .int()
                        .describe(
                          "Format code starting at a given character offset.\nThe range will extend backwards to the start of the first line containing the selected statement.\nThis option cannot be used with --cursor-offset."
                        )
                        .default(0),
                      requirePragma: z
                        .boolean()
                        .describe(
                          "Require either '@prettier' or '@format' to be present in the file's first docblock comment\nin order for it to be formatted."
                        )
                        .default(false),
                      semi: z
                        .boolean()
                        .describe("Print semicolons.")
                        .default(true),
                      singleAttributePerLine: z
                        .boolean()
                        .describe(
                          "Enforce single attribute per line in HTML, Vue and JSX."
                        )
                        .default(false),
                      singleQuote: z
                        .boolean()
                        .describe("Use single quotes instead of double quotes.")
                        .default(false),
                      tabWidth: z
                        .number()
                        .int()
                        .describe("Number of spaces per indentation level.")
                        .default(2),
                      trailingComma: z
                        .any()
                        .superRefine((x, ctx) => {
                          const schemas = [
                            z
                              .literal("es5")
                              .describe(
                                "Trailing commas where valid in ES5 (objects, arrays, etc.)"
                              ),
                            z.literal("none").describe("No trailing commas."),
                            z
                              .literal("all")
                              .describe(
                                "Trailing commas wherever possible (including function arguments)."
                              ),
                          ];
                          const errors = schemas.reduce(
                            (errors: z.ZodError[], schema) =>
                              ((result) =>
                                "error" in result
                                  ? [...errors, result.error]
                                  : errors)(schema.safeParse(x)),
                            []
                          );
                          if (schemas.length - errors.length !== 1) {
                            ctx.addIssue({
                              path: ctx.path,
                              code: "invalid_union",
                              unionErrors: errors,
                              message:
                                "Invalid input: Should pass single schema",
                            });
                          }
                        })
                        .describe(
                          "Print trailing commas wherever possible when multi-line."
                        )
                        .default("es5"),
                      useTabs: z
                        .boolean()
                        .describe("Indent with tabs instead of spaces.")
                        .default(false),
                      vueIndentScriptAndStyle: z
                        .boolean()
                        .describe("Indent script and style tags in Vue files.")
                        .default(false),
                    })
                    .optional(),
                })
                .catchall(z.never())
            )
            .describe(
              "Provide a list of patterns to override prettier configuration."
            )
            .optional(),
        })
      )
    ),
    z.string(),
  ];
  const errors = schemas.reduce(
    (errors: z.ZodError[], schema) =>
      ((result) => ("error" in result ? [...errors, result.error] : errors))(
        schema.safeParse(x)
      ),
    []
  );
  if (schemas.length - errors.length !== 1) {
    ctx.addIssue({
      path: ctx.path,
      code: "invalid_union",
      unionErrors: errors,
      message: "Invalid input: Should pass single schema",
    });
  }
});

/** @typedef { z.infer<typeof PrettierSchema> Prettier } */

