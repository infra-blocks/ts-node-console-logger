import { expect } from "@infra-blocks/test";
import { ConsoleLogger } from "../../src/index.js";

describe("index", function () {
  describe("ConsoleLogger", function () {
    describe("create", function () {
      it("should work with no parameters", function () {
        const logger = ConsoleLogger.create();
        expect(logger).to.be.instanceOf(ConsoleLogger);
      });
    });
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
