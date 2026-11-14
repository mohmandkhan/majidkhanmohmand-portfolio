'use client';

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-full bg-chalk px-5 py-2 text-[15px] font-semibold text-night hover:opacity-90">
      Print or save as PDF
    </button>
  );
}
