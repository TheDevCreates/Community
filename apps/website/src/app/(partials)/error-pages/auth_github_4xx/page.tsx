export default function GithubAuth4xx() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>400 - Github Auth Error</p>
      <p className="text-slate-300 text-xs">
        The callback code seems invalid/expired.
      </p>
    </main>
  );
}
