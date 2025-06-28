import { expect, fake, sinon } from "@infra-blocks/test";
import { ConsoleLogger } from "../../src/index.js";

describe("index", function () {
  describe(ConsoleLogger.name, function () {
    describe("create", function () {
      it("should work with no parameters", function () {
        const logger = ConsoleLogger.create();
        expect(logger).to.be.instanceOf(ConsoleLogger);
      });
    });
    for (const level of ["trace", "debug", "info", "warn", "error"] as const) {
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
        it("should should dispatch message and parameters to console", function () {
          const log = sinon.fake();
          const console = fake<Console>({
            [level]: log,
          });
          const logger = ConsoleLogger.from({ console });
          logger[level]("hello %s", "world");
          expect(log).to.have.been.calledWith("hello %s", "world");
        });
        it("should should dispatch name, message and parameters to console", function () {
          const log = sinon.fake();
          const console = fake<Console>({
            [level]: log,
          });
          const logger = ConsoleLogger.from({ console, name: "test-logger" });
          logger[level]("hello %s", "world");
          expect(log).to.have.been.calledWith("test-logger: hello %s", "world");
        });
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
