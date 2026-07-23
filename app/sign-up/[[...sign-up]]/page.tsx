import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <SignUp appearance={clerkAppearance} />
    </div>
  );
}
