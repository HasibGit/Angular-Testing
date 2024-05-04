import { CalculatorService } from "./calculator.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe("Calculator Service", () => {
  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it("Should add two numbers", () => {
    const res = calculator.add(2, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    expect(res).toBe(4);
  });

  it("Should subtract two numbers", () => {
    const res = calculator.subtract(2, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    expect(res).toBe(0);
  });
});
