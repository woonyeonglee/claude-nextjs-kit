import { z } from 'zod';

// 공통 필드 스키마
export const emailSchema = z.string().email('유효한 이메일 주소를 입력해주세요.');
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .max(100, '비밀번호는 최대 100자까지 입력 가능합니다.');
export const nameSchema = z
  .string()
  .min(2, '이름은 최소 2자 이상이어야 합니다.')
  .max(50, '이름은 최대 50자까지 입력 가능합니다.');

// 프로필 수정 스키마
export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bio: z.string().max(200, '소개는 최대 200자까지 입력 가능합니다.').optional(),
  website: z
    .string()
    .url('유효한 URL을 입력해주세요.')
    .optional()
    .or(z.literal('')),
});

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입 스키마
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

// 설정 스키마
export const settingsSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bio: z.string().max(200, '소개는 최대 200자까지 입력 가능합니다.').optional(),
  website: z
    .string()
    .url('유효한 URL을 입력해주세요.')
    .optional()
    .or(z.literal('')),
  notifications: z.object({
    email: z.boolean(),
    marketing: z.boolean(),
  }),
});

// 타입 추출
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type SettingsFormValues = z.infer<typeof settingsSchema>;
