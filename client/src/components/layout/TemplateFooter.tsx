export default function TemplateFooter() {
  return (
    <div className="max-w-7xl mx-auto px-10 pb-10">
      <div className="mt-12 h-px bg-white/5"></div>
      <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
        <p className="font-sans">
          © {new Date().getFullYear()} Majid Khan Mohmand
        </p>
        <p className="font-sans">Crafted with passion by Majid Khan Mohmand</p>
      </div>
    </div>
  );
}
