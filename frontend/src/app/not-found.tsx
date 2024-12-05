"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Title from "@/components/ui/Title";

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row-reverse gap-8 items-center justify-center p-4">
      <figure className="max-w-full">
        <Image
          src="/img/404 error with portals-cuate.svg"
          width={500}
          height={500}
          alt="Not found"
        />
      </figure>
      <div className="text-center max-w-xl space-y-3">
        <Title>
          Oh <span className="font-baskerville text-cool-red">no!</span>
        </Title>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Page not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Nothing to be found here, but you found the secret ostrich.
            <br />
            Go back before it starts chasing you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Button>

          <Button onClick={back} variant="secondary">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
