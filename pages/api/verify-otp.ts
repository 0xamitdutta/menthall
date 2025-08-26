import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { otp, userId, collegeEmail, university } = req.body;

    if (!otp || !userId || !collegeEmail || !university) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = supabaseAdmin;

    const { data: tokenData, error: tokenError } = await supabase
      .from('tokens')
      .select('*')
      .eq('user_id', userId)
      .eq('token', otp)
      .eq('token_type', 'MENTOR_VERIFICATION')
      .single();

    if (tokenError || !tokenData) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    const { error: mentorInsertError } = await supabase
      .from('mentors')
      .insert([
        {
          user_id: userId,
          college_email: collegeEmail,
          college_name: university, // Corrected column name
        },
      ]);

    if (mentorInsertError) {
      console.error('Supabase mentor insert error:', mentorInsertError);
      return res.status(500).json({ error: 'Failed to create mentor' });
    }
    
    const { error } = await supabase
      .from('users')
      .update({ bio: "mentor" })
      .eq('id', userId);

    if (error) {
      console.error('Supabase user update error:', error);
      return res.status(500).json({ error: 'Failed to update user role' });
    }

    await supabase.from('tokens').delete().eq('user_id', userId).eq('token_type', 'MENTOR_VERIFICATION');

    res.status(200).json({ message: 'Mentor created successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
