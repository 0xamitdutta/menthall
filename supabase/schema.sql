-- Create Users Table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_picture_url VARCHAR(255),
    is_creator BOOLEAN DEFAULT false,
    is_email_verified BOOLEAN DEFAULT false,
    is_mentor BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- Create Mentors Table
CREATE TABLE mentors (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    college_name VARCHAR(255) NOT NULL,
    college_email VARCHAR(255) UNIQUE NOT NULL,
    is_college_email_verified BOOLEAN DEFAULT false,
    linkedin_url VARCHAR(255),
    about TEXT
);

-- Create Index on college_email for faster lookups
CREATE INDEX idx_mentors_college_email ON mentors(college_email);

-- Create Tokens Table for session management / email verification
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_type VARCHAR(50) NOT NULL, -- e.g., 'EMAIL_VERIFICATION', 'PASSWORD_RESET'
    token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Index on user_id and token_type for faster lookups
CREATE INDEX idx_tokens_user_id_type ON tokens(user_id, token_type);

-- Create Mentor Availability Table
CREATE TABLE mentor_availability (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_mentor_availability_user_id ON mentor_availability(user_id);


-- RLS Policies for tables (example for users)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert for new users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can see their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);

ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see their own mentor data" ON mentors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own mentor data" ON mentors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow public read access to mentor profiles" ON mentors FOR SELECT USING (true);


ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tokens are manageable by the user they belong to" ON tokens FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to upload profile pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'profile-pictures' AND auth.uid() = (storage.foldername(name))[1]::uuid );

CREATE POLICY "Allow authenticated users to update their own profile picture"
ON storage.objects FOR UPDATE
TO authenticated
USING ( auth.uid() = (storage.foldername(name))[1]::uuid );
