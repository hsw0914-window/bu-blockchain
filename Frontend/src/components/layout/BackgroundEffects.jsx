export function BackgroundEffects() {
  return (
    <>
      {/* 레트로 그리드 */}
      <div className="fixed inset-0 retro-grid opacity-30 pointer-events-none" />

      {/* 플로팅 색상 오브 */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-[#ff10f0] rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none" />
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-[#00d9ff] rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="fixed top-1/2 left-1/2 w-96 h-96 bg-[#00ff88] rounded-full blur-[120px] opacity-10 animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
    </>
  );
}
