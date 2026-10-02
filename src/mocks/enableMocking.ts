export async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === "false") {
    return;
  }

  // Browser-only MSW export resolves to null in Node, so static import cannot work.
  const { worker } = await import("@/mocks/browser");
  await worker.start({
    onUnhandledFrame: "bypass",
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}
