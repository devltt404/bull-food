import Logo from "@/assets/logo.png";
import { SocialLinks } from "@/config/footer.config";

const Footer = () => {
  return (
    <footer className="relative flex items-center justify-between gap-4 bg-lime-50 px-8 py-1">
      <img src={Logo} className="w-10" />

      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-green-900">
        &copy; Made by <span className="font-medium">Tri Pham</span>
      </p>

      <div className="flex items-center gap-4">
        {SocialLinks.map(({ icon: Icon, link }, idx) => (
          <a key={idx} href={link} target="_blank" rel="noreferrer">
            <Icon className="h-7 w-7 text-muted-foreground transition hover:text-green-950" />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
