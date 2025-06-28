# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-06-28

### Added

- Suppport for log levels. When the log level is not provided, the logger behaves
exactly as `Console` would. When a log level is provided, the logger filters out
messages based on the configured logger level. For example, if the logger is
configured with `warn`, then only calls to `warn` and `error` will dispatch to
the console (and `log` with a level of `warn` or `error`).

## [0.2.0] - 2025-06-28

### Added

- Allowed the optional use of a name for the logger (used as prefix in messages).
- Added the `from` factory function to build from explicit Console object.

### Removed

- The previous `create` factory function would accept an optional console object. In general,
we will favor `from` type factory functions when they inject optional dependecies into
the object. This is because the normal use of this class is without passing the `Console`
object. The ability to pass a `Console` object is meant more for tests, so in order to
streamline the most likely use case, we've taken out the `logger` optional parameter from
`create` and moved it to `from`.

## [0.1.0] - 2025-06-15

### Added

- First implementation of the ConsoleLogger!

[0.1.0]: https://github.com/infra-blocks/ts-node-console-logger/releases/tag/v0.1.0
