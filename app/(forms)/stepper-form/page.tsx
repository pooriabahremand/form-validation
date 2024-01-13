'use client';

import { useEffect, useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface InterfaceForm {
  email: string;
  password: string;
  confirmPassword: string;
  user: {
    firstName: string;
    lastName: string;
  };
  age: number;
}

export default function StepperFunction() {
  const [active, setActive] = useState(0);

  const form = useForm<InterfaceForm>({
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
    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          password:
            values.password.trim().length >= 8
              ? null
              : 'Password must include at least 6 characters',
          confirmPassword:
            values.password === values.confirmPassword
              ? null
              : 'Your password must be the same as the password that you entered in the password field.',
        };
      }

      if (active === 1) {
        return {
          'user.firstName':
            values.user.firstName.trim().length >= 2
              ? null
              : 'Invalid input, first name moust containt at least 2 letters',
          'user.lastName':
            values.user.lastName.trim().length >= 3
              ? null
              : 'Invalid input , last name must be at least 3 letters',
          age: values.age >= 18 ? null : 'Invalid input , you have to be at least 18 ',
        };
      }

      return {};
    },
  });
  useEffect(() => {
    if (active === 2) {
      console.log(form.values);
    }
  }, [active]);

  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="First step" description="Sign up">
          <TextInput label="Email" placeholder="test@email.com" {...form.getInputProps('email')} />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="md"
            label="Confirm Password"
            placeholder="Password"
            {...form.getInputProps('confirmPassword')}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
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
          <TextInput mt="md" label="Age" placeholder="Age" {...form.getInputProps('age')} />
        </Stepper.Step>

        <Stepper.Completed>Finish , thank you for spending your time with us</Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </>
  );
}
