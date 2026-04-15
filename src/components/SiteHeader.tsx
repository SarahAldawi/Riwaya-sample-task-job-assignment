import Link from "next/link";

const SiteHeader = () => (
  <header className="border-b border-border bg-background">
    <div className="container mx-auto flex items-center justify-between py-5">
      <Link
        href="/"
        className="font-heading text-2xl font-bold tracking-tight text-foreground"
      >
        The Store
      </Link>

      <p className="text-sm text-muted-foreground hidden sm:block">
        Thoughtfully selected products
      </p>
    </div>
  </header>
);

export default SiteHeader;
