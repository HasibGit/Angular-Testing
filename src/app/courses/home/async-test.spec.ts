import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe("Test Async Operations", () => {
  it("Should make it true", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    tick(1000);

    expect(test).toBeTruthy();
  }));

  it("Complete all set timeouts", fakeAsync(() => {
    let test = false;

    setTimeout(() => {});
    setTimeout(() => {});
    setTimeout(() => {});
    setTimeout(() => {
      test = true;
    }, 1000);

    flush();

    expect(test).toBeTruthy();
  }));

  it("Should handle promise as well as set timeouts", fakeAsync(() => {
    let test = false;

    setTimeout(() => {});
    setTimeout(() => {});

    Promise.resolve()
      .then(() => {
        return Promise.resolve();
      })
      .then(() => (test = true));

    flush();
    flushMicrotasks();

    expect(test).toBeTruthy();
  }));
});
