import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
