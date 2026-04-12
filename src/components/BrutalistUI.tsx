import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest block border-l-4 border-black pl-2">
        {label}
      </label>
      <input
        {...props}
        className={cn(
          "w-full bg-white border-4 border-black p-4 font-bold text-lg outline-none focus:bg-zinc-100 transition-colors placeholder:opacity-30",
          props.className
        )}
      />
    </div>
  );
}

export function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest block border-l-4 border-black pl-2">
        {label}
      </label>
      <textarea
        {...props}
        rows={props.rows || 4}
        className={cn(
          "w-full bg-white border-4 border-black p-4 font-bold text-lg outline-none focus:bg-zinc-100 transition-colors placeholder:opacity-30 resize-none",
          props.className
        )}
      />
    </div>
  );
}

export function CheckboxCard({ label, checked, onChange, className }: { label: string, checked: boolean, onChange: () => void, className?: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex items-center gap-3 p-3 border-2 border-black font-bold text-xs uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        checked ? "bg-black text-white translate-x-1 translate-y-1 shadow-none" : "bg-white hover:bg-zinc-100",
        className
      )}
    >
      <div className={cn("w-4 h-4 border-2 flex items-center justify-center", checked ? "border-white" : "border-black")}>
        {checked && <div className="w-2 h-2 bg-white" />}
      </div>
      <span className="truncate">{label}</span>
    </button>
  );
}

export function RadioGroup({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (val: string) => void }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-widest block border-l-4 border-black pl-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "px-4 py-2 border-2 border-black font-bold text-xs uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              value === opt ? "bg-black text-white translate-x-1 translate-y-1 shadow-none" : "bg-white hover:bg-zinc-100"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-black text-white p-4 mb-4">
      <h3 className="text-xl font-black uppercase tracking-tighter">{title}</h3>
    </div>
  );
}
