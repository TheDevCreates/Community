import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Toaster } from "./ui/sonner";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextThemeProvider attribute="class" enableSystem defaultTheme="dark">
        {children}
        <Toaster />
      </NextThemeProvider>
    </>
  );
}
