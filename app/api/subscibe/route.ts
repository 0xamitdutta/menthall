import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(req: NextRequest) {
    const { email, is_mentor } = await req.json();

    if (!email || typeof email !== 'string') {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        const { error } = await supabase
            .from('subscribers')
            .insert([{ email, is_mentor: is_mentor || false }]);

        if (error) {
            console.error('Supabase error:', error);
            if (error.code === '23505') {
                // If the email already exists, check if we need to update the is_mentor status
                const { data: existingUser, error: fetchError } = await supabase
                    .from('subscribers')
                    .select('is_mentor')
                    .eq('email', email)
                    .single();

                if (fetchError || !existingUser) {
                    return NextResponse.json({ message: 'Error checking existing user' }, { status: 500 });
                }

                // If the user is not already a mentor and wants to become one
                if (!existingUser.is_mentor && is_mentor) {
                    const { error: updateError } = await supabase
                        .from('subscribers')
                        .update({ is_mentor: true })
                        .eq('email', email);

                    if (updateError) {
                        return NextResponse.json({ message: 'Error updating mentor status' }, { status: 500 });
                    }
                } else if (existingUser.is_mentor) {
                    return NextResponse.json({ message: 'You are already registered as a mentor.' }, { status: 409 });
                } else {
                    return NextResponse.json({ message: 'You are already on the waitlist.' }, { status: 409 });
                }
            } else {
                return NextResponse.json({ message: 'Error saving to database' }, { status: 500 });
            }
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: is_mentor ? 'Welcome to the Menthall Mentor Network!' : 'Subscription Confirmation',
            text: is_mentor
                ? 'Thank you for your interest in becoming a mentor! We will reach out to you with more details soon.'
                : 'Thank you for subscribing to our waitlist!',
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}