import { z } from 'zod';

const registerFormSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),

  email: z.string().email('Informe um e-mail válido'),

  password: z.string().min(6, 'A senha deve ter pelo menos 8 caracteres'),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export { registerFormSchema };
export type { RegisterFormData };
