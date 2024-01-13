'use client';

import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { FormErrors, useForm } from '@mantine/form';
import { Box, Button, NumberInput, PasswordInput, TextInput } from '@mantine/core';

interface formInterface {
  email: string;
  password: string;
  confirmPassword: string;
  user: {
    firstName: string;
    lastName: string;
  };
  age: number;
}

export default function ZodForm() {
  const schema = z
    .object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z
        .string()
        .min(8, { message: 'Invalid input , passowrd must contain at least 8 character' }),
      confirmPassword: z
        .string()
        .min(8, { message: 'Invalid input , passowrd must contain at least 8 character' }),
      user: z.object({
        firstName: z
          .string()
          .min(2, { message: 'Invalid input, first name must containt at least 2 letters' }),
        lastName: z
          .string()
          .min(2, { message: 'Invalid input, last name must containt at least 3 letters' }),
      }),
      age: z.number().min(18, {
        message: 'You must be at least 18 to create an account',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const form = useForm<formInterface>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      user: {
        firstName: '',
        lastName: '',
      },
      age: 0,
    },
    validate: zodResolver(schema) as unknown as (values: formInterface) => FormErrors,
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <PasswordInput
          label="Password"
          description="It most be at least 8 charecter"
          placeholder="Enter your password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="Confirm password"
          description="It most be the same password that you entered in the last field"
          placeholder="Confirm your password"
          {...form.getInputProps('confirmPassword')}
        />
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps('user.firstName')}
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps('user.lastName')}
        />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="Age"
          min={0}
          max={99}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}
