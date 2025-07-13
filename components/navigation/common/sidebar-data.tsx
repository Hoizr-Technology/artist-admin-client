import {
  BlocksIcon,
  BookHeartIcon,
  BoxIcon,
  CircleDollarSignIcon,
  CircleUserRoundIcon,
  FileChartLineIcon,
  HomeIcon,
  MenuSquareIcon,
  MonitorIcon,
  SettingsIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

export type TSidebarSubItem = {
  title: string;
  href: string;
};

export type TSidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  subItems?: TSidebarSubItem[];
};

export const getSidebarList = (
  manageSubscriptionLink: string
): TSidebarItem[] => [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    active: true,
  },
  {
    title: "Menu Management",
    href: "/menu/menu-builder/menu",
    icon: MenuSquareIcon,
    active: true,
  },
  {
    title: "POS Integrations",
    href: "/aggregator",
    icon: BlocksIcon,
    active: true,
  },
  {
    title: "Marketing",
    href: "",
    icon: BookHeartIcon,
    active: true,
    subItems: [
      {
        title: "Campaigns",
        href: "/campaigns/custom-campaigns",
      },
      {
        title: "Rewards & Loyalty",
        href: "/rewards",
      },
      {
        title: "Offers",
        href: "/marketing/coupon",
      },
    ],
  },
  {
    title: "Orders",
    href: "/order",
    icon: BoxIcon,
    active: true,
  },
  {
    title: "Customers",
    href: "",
    icon: CircleUserRoundIcon,
    active: true,
    subItems: [
      {
        title: "Guests",
        href: "/guests",
      },
      {
        title: "Registered",
        href: "/customer",
      },
    ],
  },
  {
    title: "Teams",
    href: "/teams",
    icon: UsersRoundIcon,
    active: true,
  },
  {
    title: "Payments",
    href: "",
    icon: CircleDollarSignIcon,
    active: true,
    subItems: [
      {
        title: "Invoices",
        href: "/payment/invoices",
      },
      {
        title: "Integrations",
        href: "/payment/stripe-integration",
      },
      {
        title: "Payouts",
        href: "/payment/payouts",
      },
      {
        title: "Manage Subscription",
        href: manageSubscriptionLink || "/payment/subscription",
      },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileChartLineIcon,
    active: true,
  },
  {
    title: "Website Builder",
    href: "/cms",
    icon: MonitorIcon,
    active: true,
  },
  // {
  //   title: "Inventory Management",
  //   href: "/inventory",
  //   icon: LayersIcon,
  //   access: null,
  //   active: false,
  // },
  // {
  //   title: "Table Reservation",
  //   href: "/reservation",
  //   icon: CalendarCheckIcon,
  //   access: null,
  //   active: false,
  // },
  // {
  //   title: "Catering",
  //   href: "/catering",
  //   icon: CookingPotIcon,
  //   access: null,
  //   active: false,
  // },
  {
    title: "Settings",
    href: "/restaurant-settings",
    icon: SettingsIcon,
    active: true,
  },
];
