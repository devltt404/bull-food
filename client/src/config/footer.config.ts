import { IconComponent } from "@/utils/types";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";

export const SocialLinks: {
  icon: IconComponent;
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
