import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/features/auth/hooks/use-auth-modal-controller";
import AuthModal from "@/features/auth/components/auth-modal";

export default function GuestHomePage() {
  const modal = useAuthModal();
  return (
    <div className="mx-auto max-w-6xl mr-14 px-8 py-10 flex flex-col flex-1 items-start gap-6 ">
      <h1 className="text-4xl font-bold">LearnOS AI</h1>
      <p className="mt-4 text-muted-foreground">
        Production AI learning platform.
      </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={modal.openLogin}>
          Login
        </Button>

        <Button onClick={modal.openRegister}>Sign Up</Button>
      </div>

      <AuthModal
        open={modal.open}
        mode={modal.mode}
        onOpenChange={modal.onOpenChange}
        onModeChange={modal.switchMode}
        onClose={modal.close}
      />
    </div>
  );
}
