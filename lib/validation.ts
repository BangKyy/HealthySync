import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .min(8, "Nama pengguna minimal harus 8 karakter.")
        .max(30, "Nama pengguna maximal harus 30 karakter."),
    email: z.string().email("Alamat email salah."),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), "Nomor telepon tidak valid.")
})