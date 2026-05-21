export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-tight ${className}`}>
      Fast Guide<span className="text-seafoam">.</span>
    </span>
  );
}
