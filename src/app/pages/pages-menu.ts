import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Cài đặt',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Quản lý tài khoản',
        icon: 'person-outline',
        link: '/pages/user',
      },
      {
        title: 'Quản lý doanh nghiệp',
        icon: 'npm-outline',
        link: '/pages/company',
      },
      {
        title: 'Quản lý hành động',
        icon: 'lock-outline',
        link: '/pages/action',
      },
      {
        title: 'Quản lý menu',
        icon: 'menu-outline',
        link: '/pages/module',
      },
      {
        title: 'Quản lý quyền',
        icon: 'smiling-face-outline',
        link: '/pages/role',
      },
    ],
  },
];
