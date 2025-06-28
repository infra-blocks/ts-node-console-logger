import { Logger, LogLevel } from "@infra-blocks/logger-interface";
import { unreachable } from "@infra-blocks/types";

export type ConsoleLoggerOptions = {
  name?: string;
  level?: LogLevel;
};

/**
 * An implementation of the {@link Logger} interface that uses the Node.js console for logging.
 *
 * Unlike regular loggers, the console object does not support log levels. Every log call is printed
 * somewhere (either to stdout or stderr) regardless of the log level. Consequently, all
 * `is<LogLevel>Enabled()` methods always return `true`.
 *
 * @see https://nodejs.org/api/console.html
 */
export class ConsoleLogger implements Logger {
  private readonly console: Console;
  private readonly name?: string;
  private readonly level?: LogLevel;

  private constructor(params: {
    console: Console;
    name?: string;
    level?: LogLevel;
  }) {
    const { console, name, level } = params;
    this.console = console;
    this.name = name;
    this.level = level;
  }

  log(level: LogLevel, message: string, ...args: unknown[]): void {
    switch (level) {
      case "trace":
        this.trace(message, ...args);
        break;
      case "debug":
        this.debug(message, ...args);
        break;
      case "info":
        this.info(message, ...args);
        break;
      case "warn":
        this.warn(message, ...args);
        break;
      case "error":
        this.error(message, ...args);
        break;
      default:
        unreachable(level);
    }
  }
  trace(message: string, ...args: unknown[]): void {
    if (this.isTraceEnabled()) {
      this.console.trace(this.message(message), ...args);
    }
  }
  debug(message: string, ...args: unknown[]): void {
    if (this.isDebugEnabled()) {
      this.console.debug(this.message(message), ...args);
    }
  }
  info(message: string, ...args: unknown[]): void {
    if (this.isInfoEnabled()) {
      this.console.info(this.message(message), ...args);
    }
  }
  warn(message: string, ...args: unknown[]): void {
    if (this.isWarnEnabled()) {
      this.console.warn(this.message(message), ...args);
    }
  }
  error(message: string, ...args: unknown[]): void {
    if (this.isErrorEnabled()) {
      this.console.error(this.message(message), ...args);
    }
  }
  isTraceEnabled(): boolean {
    return this.level == null || this.level === "trace";
  }
  isDebugEnabled(): boolean {
    return this.isTraceEnabled() || this.level === "debug";
  }
  isInfoEnabled(): boolean {
    return this.isDebugEnabled() || this.level === "info";
  }
  isWarnEnabled(): boolean {
    return this.isInfoEnabled() || this.level === "warn";
  }
  isErrorEnabled(): boolean {
    return this.isWarnEnabled() || this.level === "error";
  }

  private message(message: string): string {
    if (this.name == null) {
      return message;
    }
    return `${this.name}: ${message}`;
  }

  /**
   * Creates a new instance of {@link ConsoleLogger} with the specified console object
   * and options.
   *
   * @param params.console The console object to which all log calls are dispatched.
   * @param params.name An optional name for the logger instance.
   *
   * @returns A new instance of {@link ConsoleLogger}.
   */
  static from(
    params: { console: Console } & ConsoleLoggerOptions
  ): ConsoleLogger {
    return new ConsoleLogger(params);
  }

  /**
   * Creates a new instance of {@link ConsoleLogger}.
   *
   * The logger defaults to the global {@link console} object and optionally
   * accepts a name, which acts as a prefix for all log messages. Log messages
   * are of the form `<name: >message` when a name is provided or just the message
   * otherwise.
   *
   * @param params.console The console object to which all log calls are dispatched.
   * @param params.logLevel The log level for the logger. When not provided, it defaults
   * to the {@link Console} behavior, which is to log everything.
   *
   * @returns A new instance of {@link ConsoleLogger}.
   */
  static create(params: ConsoleLoggerOptions = {}): ConsoleLogger {
    return ConsoleLogger.from({ console, ...params });
  }
}
