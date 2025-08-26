export interface Token {
  id: number;
  user_id: string;
  token_type: 'EMAIL_VERIFICATION' | 'PASSWORD_RESET';
  token: string;
  expires_at: Date;
  created_at: Date;
}
