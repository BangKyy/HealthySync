"use client"
 
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";

import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}
 
const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    setIsLoading(true);

    try{
        const user = { 
          name: values.name, 
          email: values.email, 
          phone: values.phone 
        }

        const newUser = await createUser(user);

        console.log(Boolean);
        if(newUser) 
          router.push(`/patients/${newUser.$id}/register`);
    } catch (err) {
        console.log(err);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="text-4xl font-semibold">Selamat Datang</h1>
            <p className="font-light text-dark-700">Jadwalkan perjanjian pertemuan pertama anda.</p>
        </section>
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="Kyy"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="kyycodes.lab@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />
        <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(62) 812 3456 7890"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
        
        <SubmitButton isLoading={isLoading}>Mulai</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm