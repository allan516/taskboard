import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),

  password: z.string().min(1, 'Informe sua senha'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export { loginFormSchema };
export type { LoginFormData };
