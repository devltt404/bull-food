import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Mail } from "lucide-react";

export const SocialLinks: {
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
}[] = [
  {
    icon: GitHubLogoIcon,
    link: "https://github.com/devltt404",
  },
  {
    icon: LinkedInLogoIcon,
    link: "https://www.linkedin.com/in/tri-pham-843878294/",
  },
  {
    icon: Mail,
    link: "mailto:ductripham@usf.edu",
  },
];
