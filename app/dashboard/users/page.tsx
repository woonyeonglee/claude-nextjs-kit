'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/common/data-table';
import { PageHeader } from '@/components/common/page-header';
import { ConfirmDialog } from '@/components/common/confirm-dialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  joinedAt: Date;
}

// 샘플 데이터
const SAMPLE_USERS: User[] = [
  { id: '1', name: '김민준', email: 'minjun@example.com', role: 'admin', status: 'active', joinedAt: new Date('2024-01-15') },
  { id: '2', name: '이서연', email: 'seoyeon@example.com', role: 'editor', status: 'active', joinedAt: new Date('2024-02-20') },
  { id: '3', name: '박지호', email: 'jiho@example.com', role: 'viewer', status: 'inactive', joinedAt: new Date('2024-03-10') },
  { id: '4', name: '최유나', email: 'yuna@example.com', role: 'editor', status: 'active', joinedAt: new Date('2024-04-05') },
  { id: '5', name: '정현우', email: 'hyunwoo@example.com', role: 'viewer', status: 'active', joinedAt: new Date('2024-05-12') },
  { id: '6', name: '한소희', email: 'sohee@example.com', role: 'editor', status: 'inactive', joinedAt: new Date('2024-06-18') },
  { id: '7', name: '오태양', email: 'taeyang@example.com', role: 'viewer', status: 'active', joinedAt: new Date('2024-07-22') },
  { id: '8', name: '신지수', email: 'jisu@example.com', role: 'admin', status: 'active', joinedAt: new Date('2024-08-30') },
  { id: '9', name: '임다은', email: 'daeun@example.com', role: 'viewer', status: 'active', joinedAt: new Date('2024-09-14') },
  { id: '10', name: '강민서', email: 'minseo@example.com', role: 'editor', status: 'inactive', joinedAt: new Date('2024-10-03') },
  { id: '11', name: '윤채원', email: 'chaewon@example.com', role: 'viewer', status: 'active', joinedAt: new Date('2024-11-17') },
  { id: '12', name: '배준혁', email: 'junhyeok@example.com', role: 'editor', status: 'active', joinedAt: new Date('2024-12-08') },
];

const ROLE_LABELS: Record<User['role'], string> = {
  admin: '관리자',
  editor: '편집자',
  viewer: '뷰어',
};

const ROLE_VARIANTS: Record<User['role'], 'default' | 'secondary' | 'outline'> = {
  admin: 'default',
  editor: 'secondary',
  viewer: 'outline',
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: '사용자',
      cell: ({ row }) => {
        const user = row.original;
        const initials = user.name.slice(0, 2);
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: '역할',
      cell: ({ row }) => {
        const role = row.getValue<User['role']>('role');
        return (
          <Badge variant={ROLE_VARIANTS[role]}>{ROLE_LABELS[role]}</Badge>
        );
      },
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const status = row.getValue<User['status']>('status');
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status === 'active' ? '활성' : '비활성'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'joinedAt',
      header: '가입일',
      cell: ({ row }) => {
        const date = row.getValue<Date>('joinedAt');
        return (
          <span className="text-muted-foreground text-sm">
            {format(date, 'yyyy년 MM월 dd일', { locale: ko })}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(user.email);
                  toast.success('이메일이 복사되었습니다.');
                }}
              >
                이메일 복사
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteTarget(user)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleDelete = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast.success(`${deleteTarget.name} 사용자가 삭제되었습니다.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="사용자 관리"
        description="전체 사용자 목록을 조회하고 관리합니다."
        action={
          <Button onClick={() => toast.info('사용자 추가 기능은 준비 중입니다.')}>
            <Plus className="mr-2 h-4 w-4" />
            사용자 추가
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="이름 또는 이메일 검색..."
        pageSize={8}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="사용자를 삭제하시겠습니까?"
        description={`${deleteTarget?.name} 사용자를 삭제하면 복구할 수 없습니다.`}
        confirmLabel="삭제"
        onConfirm={handleDelete}
      />
    </div>
  );
}
