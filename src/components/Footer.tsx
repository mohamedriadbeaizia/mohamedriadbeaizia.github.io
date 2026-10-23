import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        © {new Date().getFullYear()} {site.name} — Master 2 IWOCS · en recherche de stage
      </div>
    </footer>
  );
}
