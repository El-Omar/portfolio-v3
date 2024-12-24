"use client";

import { ReactElement, useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

const LoginForm = (): ReactElement => {
  const [state, submitLogin, isPending] = useActionState(login, null);

  const error = (() => {
    if (!state?.error) {
      return "";
    }
    if (typeof state.error === "string") {
      return state.error;
    }
    const errors = Object.values(state.error);
    return errors.join(", ");
  })();

  return (
    <div className="my-0 md:my-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white px-8 py-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Admin Login
          </h2>

          <form action={submitLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error || "Unknown error happened"}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
