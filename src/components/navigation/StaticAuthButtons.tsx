import { Button } from "@/components/ui/button";
import Link from "next/link";

// Static version of AuthButtons for server-side rendering/build time
export default function StaticAuthButtons() {
  return (
    <div className="flex space-x-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/?auth=signin">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/?signup=true">Sign Up</Link>
      </Button>
    </div>
  );
}
