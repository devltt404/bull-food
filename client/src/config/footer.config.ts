import GitHubIcon from "@/components/svg/GitHubIcon";
import LinkedinIcon from "@/components/svg/LinkedinIcon";
import { Mail } from "lucide-react";
import { FC, SVGProps } from "react";

export const SocialLinks: {
  icon: FC<SVGProps<SVGSVGElement>>;
  link: string;
  label: string;
}[] = [
  {
    icon: GitHubIcon,
    link: "https://github.com/devltt404",
    label: "GitHub profile",
  },
  {
    icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/tri-pham-843878294/",
    label: "LinkedIn profile",
  },
  {
    icon: Mail,
    link: "mailto:ductripham@usf.edu",
    label: "Email me",
  },
];
