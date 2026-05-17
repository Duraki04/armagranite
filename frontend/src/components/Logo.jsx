export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="public/logo.png"
        alt="ARMA GRANIT"
        className="h-10 w-auto"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          ARMA GRANIT
        </span>
        <span className="text-xs text-slate-600">
          Natural Stone Solutions
        </span>
      </div>
    </div>
  );
}
