import { SocialLinks } from "@/config/footer.config";

const Footer = () => {
  return (
    <footer className="relative bg-lime-50 px-8 py-2.5">
      <div className="container flex items-center justify-between">
        <p className="text-lg text-green-900">
          &copy; Made by <span className="font-medium">Tri Pham</span>
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {SocialLinks.map(({ icon: Icon, link }, idx) => (
            <a key={idx} href={link} target="_blank" rel="noreferrer">
              <Icon className="h-7 w-7 text-muted-foreground transition hover:text-green-950" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
