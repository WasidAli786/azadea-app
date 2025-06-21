import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface UserDashboardRecord {
  id: number | string;
  title: string;
  image_public_url: string;
  link?: string;
}

export interface VerifyResponse {
  records: {
    dashboards: UserDashboardRecord[];
  };
}
