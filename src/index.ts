import { Logger, LogLevel } from "@infra-blocks/logger-interface";

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
  private readonly logger: Console;

  private constructor(params: { logger: Console }) {
    const { logger } = params;
    this.logger = logger;
  }

  log(level: LogLevel, message: string, ...args: unknown[]): void {
    this.logger.log(message, ...args);
  }
  trace(message: string, ...args: unknown[]): void {
    this.logger.trace(message, ...args);
  }
  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
  error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }
  isTraceEnabled(): boolean {
    return true;
  }
  isDebugEnabled(): boolean {
    return true;
  }
  isInfoEnabled(): boolean {
    return true;
  }
  isWarnEnabled(): boolean {
    return true;
  }
  isErrorEnabled(): boolean {
    return true;
  }

  /**
   * Creates a new instance of {@link ConsoleLogger}.
   *
   * The console parameter can be omitted and defaults to the global {@link console} object.
   *
   * @param params.console The console object to which all log calls are dispatched.
   *
   * @returns A new instance of {@link ConsoleLogger}.
   */
  static create(params?: { logger?: Console }): ConsoleLogger {
    const { logger = console } = params || {};
    return new ConsoleLogger({ logger });
  }
}
