export function MakerMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "maker-mark maker-mark--compact" : "maker-mark"}
      aria-hidden="true"
    >
      <span>K</span>
      <span>N</span>
      <span>J</span>
    </span>
  );
}
