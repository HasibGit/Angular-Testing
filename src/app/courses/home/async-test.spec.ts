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

it("promise + setTimeout()", fakeAsync(() => {
  let counter = 0;

  Promise.resolve().then(() => {
    counter += 10;

    setTimeout(() => {
      counter += 1;
    }, 1000);
  });

  expect(counter).toBe(0);

  flushMicrotasks();

  expect(counter).toBe(10);

  tick(500);

  expect(counter).toBe(10);

  tick(500);

  expect(counter).toBe(11);
}));
