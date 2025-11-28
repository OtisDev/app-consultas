export type Menu = {
  id?: number;
  name: string;
  icon: string;
  path: string;
  parent_id?: number | null;
}

export type MenuItem = Menu & {
  children: Menu[];
}
