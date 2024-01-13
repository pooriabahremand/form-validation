'use client';

import { Box, Button, NumberInput, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface formInterface {
  user: {
    firstName: string;
    lastName: string;
  };
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

// initialValues: {

export default function Regular() {
  const form = useForm<formInterface>({
    initialValues: {
      user: { firstName: '', lastName: '' },
      email: '',
      age: 0,
      password: '',
      confirmPassword: '',
    },
    validate: {
      user: {
        firstName: (value) =>
          value.trim().length > 2 ? null : 'First Name most contain at least 2 letters',
        lastName: (value) =>
          value.trim().length > 3 ? null : 'Last name most containt at least 3 letters',
      },
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
      password: (value) =>
        value.trim().length > 8 ? null : 'password most containt at least 8 charechters',
      confirmPassword: (value, values) =>
        value === values.password ? null : '2 password have to match',
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Box>
  );
}
