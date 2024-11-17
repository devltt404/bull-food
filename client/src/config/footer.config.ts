import { IconComponent } from "@/utils/types";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";

export const SocialLinks: {
  icon: IconComponent;
  link: string;
  label: string;
}[] = [
  {
    icon: GitHubLogoIcon,
    link: "https://github.com/devltt404",
    label: "GitHub profile",
  },
  {
    icon: LinkedInLogoIcon,
    link: "https://www.linkedin.com/in/tri-pham-843878294/",
    label: "LinkedIn profile",
  },
  {
    icon: Mail,
    link: "mailto:ductripham@usf.edu",
    label: "Email me",
  },
];
