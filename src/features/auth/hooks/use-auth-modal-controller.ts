import { useCallback, useState } from "react";

export type AuthMode = "login" | "register";

export function useAuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openLogin = useCallback(() => {
    setMode("login");
    setOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setMode("register");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const switchMode = useCallback((mode: AuthMode) => {
    setMode(mode);
  }, []);

  return {
    open,
    mode,
    openLogin,
    openRegister,
    close,
    switchMode,
    onOpenChange: setOpen,
  };
}
