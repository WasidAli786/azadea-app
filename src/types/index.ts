import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface UserDashboardRecord {
  _id: number | string;
  title: string;
  image_public_url: string;
  link: string;
  description: string;
  isBookmarked: boolean;
}

export interface VerifyResponse {
  cards: UserDashboardRecord[];
}
