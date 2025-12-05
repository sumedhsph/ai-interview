// vitest.setup.ts
import "@testing-library/jest-dom";

// Safe polyfill for TextEncoder/TextDecoder
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = await import("util");

  global.TextEncoder = TextEncoder;
  // @ts-expect-error - Same reason
  global.TextDecoder = TextDecoder;
}

// Mock next/navigation so `useRouter` doesn't throw in unit tests when the app
// router isn't mounted (vitest environment). This provides a no-op router.
import { vi } from "vitest";

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn().mockResolvedValue(undefined),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
});
