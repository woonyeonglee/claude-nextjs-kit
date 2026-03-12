export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  navLinks: NavLink[];
}

export interface StatCardData {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface SidebarLink {
  label: string;
  href: string;
  icon: string;
}

// API 관련 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// DataTable 관련 타입
export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

// 공통 상태 타입
export type Status = 'active' | 'inactive' | 'pending';
export type Role = 'admin' | 'editor' | 'viewer';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joinedAt: Date;
}
