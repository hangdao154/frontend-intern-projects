'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer'
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status'
    }),
    date: z.string()
})

export type State = {
    errors?: {
        customerId?: string[],
        amount?: string[],
        status?: string[]
    },
    message?: string | null
}

const CreateInvoice = FormSchema.omit({ id: true, date: true })
export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data
    const amountInCents = amount * 100
    const date = new Date().toISOString().split('T')[0]     // Create a new date with the format "YYYY-MM-DD"

    try {
        await sql
            `INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`
    } catch (error) {
        console.log(error)
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data
    const amountInCents = amount * 100;

    try {
        await sql
            `UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}`;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    // throw new Error('Failed to delete invoice')

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        // Action called in the '/dashboard/invoices' path, no need to call redirect
        revalidatePath('/dashboard/invoices');
        // return { message: 'Deleted Invoice. ' }
    } catch (error) {
        console.log(error)
        // return {
        //     message:  'Database Error: Failed to Delete Invoice.'
        // }
    }
}