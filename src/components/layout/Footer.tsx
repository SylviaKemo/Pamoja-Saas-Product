import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-cream px-7 pt-[72px] pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 min-w-0">
            <Logo variant="flat" />
            <p className="mt-3.5 text-sm text-body">Customer conversations, together.</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2.5 text-sm">
              <div className="mb-1 font-bold">{column.title}</div>
              {column.links.map((link) => (
                <a key={link.label} href={link.href} className="text-body transition-colors hover:text-pine">
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-2 border-t border-sand-200 pt-[22px] text-[13px] text-body">
          <span>© 2026 Pamoja</span>
          <span>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/sylvia-kemo/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald underline-offset-2 hover:text-pine hover:underline"
            >
              Sylvia
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
