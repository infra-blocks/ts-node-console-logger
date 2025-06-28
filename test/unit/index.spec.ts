import { expect, fake, sinon } from "@infra-blocks/test";
import { ConsoleLogger } from "../../src/index.js";
import { LogLevel } from "@infra-blocks/logger-interface";

// TODO: this could bottle up to the interface.
interface LogTestConfig {
  // Log method
  level: LogLevel;
  // Logger levels that will allow the log.
  allowed: LogLevel[];
  // Logger levels that will not allow the log.
  disallowed: LogLevel[];
}

const LOG_TEST_CONFIGS: LogTestConfig[] = [
  {
    level: "trace",
    allowed: ["trace"],
    disallowed: ["debug", "info", "warn", "error"],
  },
  {
    level: "debug",
    allowed: ["trace", "debug"],
    disallowed: ["info", "warn", "error"],
  },
  {
    level: "info",
    allowed: ["trace", "debug", "info"],
    disallowed: ["warn", "error"],
  },
  {
    level: "warn",
    allowed: ["trace", "debug", "info", "warn"],
    disallowed: ["error"],
  },
  {
    level: "error",
    allowed: ["trace", "debug", "info", "warn", "error"],
    disallowed: [],
  },
];

describe("index", function () {
  describe(ConsoleLogger.name, function () {
    describe("create", function () {
      it("should work with no parameters", function () {
        const logger = ConsoleLogger.create();
        expect(logger).to.be.instanceOf(ConsoleLogger);
      });
    });
    for (const config of LOG_TEST_CONFIGS) {
      const { level, allowed, disallowed } = config;
      describe(level, function () {
        it("should dispatch message to console", function () {
          const log = sinon.fake();
          const console = fake<Console>({
            [level]: log,
          });
          const logger = ConsoleLogger.from({ console });
          logger[level]("hello?");
          expect(log).to.have.been.calledWith("hello?");
        });
        it("should dispatch message and parameters to console", function () {
          const log = sinon.fake();
          const console = fake<Console>({
            [level]: log,
          });
          const logger = ConsoleLogger.from({ console });
          logger[level]("hello %s", "world");
          expect(log).to.have.been.calledWith("hello %s", "world");
        });
        it("should dispatch name, message and parameters to console", function () {
          const log = sinon.fake();
          const console = fake<Console>({
            [level]: log,
          });
          const logger = ConsoleLogger.from({ console, name: "test-logger" });
          logger[level]("hello %s", "world");
          expect(log).to.have.been.calledWith("test-logger: hello %s", "world");
        });
        for (const loggerLevel of allowed) {
          it(`should dispatch name, message and parameters to console with ${loggerLevel} level`, function () {
            const log = sinon.fake();
            const console = fake<Console>({
              [level]: log,
            });
            const logger = ConsoleLogger.from({
              console,
              name: "test-logger",
              level: loggerLevel,
            });
            logger[level]("hello %s", "world");
            expect(log).to.have.been.calledWith(
              "test-logger: hello %s",
              "world"
            );
          });
        }
        for (const loggerLevel of disallowed) {
          it("should silence the output for disallowed level", function () {
            const log = sinon.fake();
            const console = fake<Console>({
              [level]: log,
            });
            const logger = ConsoleLogger.from({
              console,
              name: "test-logger",
              level: loggerLevel,
            });
            logger[level]("hello %s", "world");
            expect(log).to.not.have.been.called;
          });
        }
      });
    }
    describe("isTraceEnabled", function () {
      it("should always return true", function () {
        const logger = ConsoleLogger.create();
        expect(logger.isTraceEnabled()).to.be.true;
      });
    });
    describe("isDebugEnabled", function () {
      it("should always return true", function () {
        const logger = ConsoleLogger.create();
        expect(logger.isDebugEnabled()).to.be.true;
      });
    });
    describe("isInfoEnabled", function () {
      it("should always return true", function () {
        const logger = ConsoleLogger.create();
        expect(logger.isInfoEnabled()).to.be.true;
      });
    });
    describe("isWarnEnabled", function () {
      it("should always return true", function () {
        const logger = ConsoleLogger.create();
        expect(logger.isWarnEnabled()).to.be.true;
      });
    });
    describe("isErrorEnabled", function () {
      it("should always return true", function () {
        const logger = ConsoleLogger.create();
        expect(logger.isErrorEnabled()).to.be.true;
      });
    });
  });
});
