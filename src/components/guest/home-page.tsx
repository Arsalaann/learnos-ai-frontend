import { useAuthModal } from "@/features/auth/hooks/use-auth-modal-controller";

import AuthModal from "@/features/auth/components/auth-modal";
import Header from "../layout/header";

export default function GuestHomePage() {
  const modal = useAuthModal();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        {/* Editorial side */}
        <section className="flex min-h-[55vh] flex-col justify-between border-b border-border px-8 py-8 sm:px-12 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-16 lg:py-12 xl:px-24">
          <Header />

          <div className="max-w-2xl py-16 lg:py-0">
            <p className="mb-5 font-mono text-md uppercase tracking-[0.3em] text-primary">
              The study desk
            </p>

            <h1 className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.045em]">
              Read deeply.
              <br />
              <span className="italic text-primary">Think</span>
              <br />
              <span className="italic text-primary">clearly.</span>
            </h1>

            <p className="mt-10 max-w-md text-sm leading-6 text-muted-foreground">
              A quiet place to bring your documents, ask better questions, and
              keep your learning connected.
            </p>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Private by default · Built for focus
          </p>
        </section>

        {/* Authentication side */}
        <section className="flex items-center justify-center px-8 py-16 sm:px-12 lg:min-h-screen lg:px-16 xl:px-24">
          <AuthModal mode={modal.mode} onModeChange={modal.switchMode} />
        </section>
      </div>
    </main>
  );
}
