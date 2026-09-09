import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { siteConfig } from "@/data/site";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const {
    isLoading: authLoading,
    isAuthenticated,
    signIn,
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Failed to sign in as guest: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <Card className="min-w-[360px] max-w-[420px] border-white/[0.06] bg-[#111] shadow-lg">
        {step === "signIn" ? (
          <>
            <CardHeader className="text-center">
              <a
                href="/"
                className="mb-2 block text-lg font-bold text-white hover:text-[#A78BFA] transition-colors"
              >
                {siteConfig.name}
              </a>
              <CardTitle className="text-xl">
                {searchParams.get("returnTo")?.includes("booking")
                  ? "Sign in to continue"
                  : "Welcome back"}
              </CardTitle>
              <CardDescription>
                Enter your email to sign in or create an account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/25" />
                    <Input
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      className="border-white/[0.08] bg-white/[0.03] pl-9 focus:border-[#A78BFA] text-white placeholder:text-white/20"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading}
                    className="bg-[#A78BFA] hover:bg-[#C4B5FD] text-black"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/[0.06]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#111] px-2 text-white/25">
                        Or
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4 w-full border-white/[0.08] text-white/60"
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Continue as Guest
                  </Button>
                </div>
              </CardContent>
            </form>
          </>
        ) : (
          <>
            <CardHeader className="mt-4 text-center">
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent a code to {step.email}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleOtpSubmit}>
              <CardContent className="pb-4">
                <input type="hidden" name="email" value={step.email} />
                <input type="hidden" name="code" value={otp} />

                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        otp.length === 6 &&
                        !isLoading
                      ) {
                        const form = (
                          e.target as HTMLElement
                        ).closest("form");
                        if (form) form.requestSubmit();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {error && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}
                <p className="mt-4 text-center text-sm text-white/35">
                  Didn&apos;t receive a code?{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[#A78BFA]"
                    onClick={() => setStep("signIn")}
                  >
                    Try again
                  </Button>
                </p>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-[#6C3AED] hover:bg-[#5B2ED4]"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      Verify code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("signIn")}
                  disabled={isLoading}
                  className="w-full"
                >
                  Use different email
                </Button>
              </CardFooter>
            </form>
          </>
        )}

        <div className="rounded-b-lg border-t border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center text-xs text-white/25">
          <a
            href="/"
            className="font-medium text-[#A78BFA] hover:text-[#C4B5FD] transition-colors"
          >
            {siteConfig.name}
          </a>
        </div>
      </Card>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
