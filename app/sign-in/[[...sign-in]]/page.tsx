import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <div className="auth-page">
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}
