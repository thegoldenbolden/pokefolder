import type { Provider } from "@/lib/auth/utils";

type OAuthErrorName =
  | "InvalidOAuthProvider"
  | "OAuthError"
  | "OAuthCallbackError"
  | "OAuthProfileError";

type OAuthErrorOptions = {
  provider?: Provider;
  message?: string;
};

export class OAuthError extends Error {
  name: OAuthErrorName;
  options: OAuthErrorOptions;

  constructor(
    name: OAuthErrorName = "OAuthError",
    options: OAuthErrorOptions = {},
  ) {
    super(options.message);
    this.name = name;
    this.options = options;

    this.setMessage();
  }

  setMessage() {
    if (this.options.message) {
      this.message = this.options.message;
      return;
    }

    switch (this.name) {
      default:
        return;
      case "OAuthCallbackError":
        this.message = "Failed to find the 'code_verifier' cookie";
        return;
    }
  }
}

export function isOAuthError(error: unknown): error is OAuthError {
  return error instanceof OAuthError;
}
