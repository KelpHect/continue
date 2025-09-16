import { setLocalStorage } from "./localStorage";

describe("localStorage Test", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should stringify and set value in localStorage", () => {
    const MOCK_ONBOARDING_STATUS_VALUE = "Started";
    setLocalStorage("onboardingStatus", MOCK_ONBOARDING_STATUS_VALUE);
    const storedValue = localStorage.getItem("onboardingStatus");
    expect(storedValue).not.toBeNull();
    expect(JSON.parse(storedValue!)).toEqual(
      MOCK_ONBOARDING_STATUS_VALUE,
    );
  });
});
