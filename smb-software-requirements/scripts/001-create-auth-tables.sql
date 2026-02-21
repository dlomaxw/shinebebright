-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  business_type TEXT,
  phone TEXT,
  country TEXT DEFAULT 'Uganda',
  city TEXT,
  credits INTEGER DEFAULT 0,
  subscription_plan TEXT DEFAULT 'free', -- free, basic, premium, enterprise
  subscription_status TEXT DEFAULT 'inactive', -- active, inactive, cancelled, expired
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  role TEXT DEFAULT 'user', -- user, admin, super_admin
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create credit transactions table
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- purchase, usage, refund, bonus, admin_grant
  amount INTEGER NOT NULL, -- positive for credits added, negative for credits used
  description TEXT,
  reference_id TEXT, -- for linking to specific actions/purchases
  created_by UUID REFERENCES user_profiles(id), -- admin who granted credits
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  credits_included INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create API usage tracking table
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  credits_used INTEGER DEFAULT 1,
  request_data JSONB,
  response_status INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, display_name, description, price_monthly, price_yearly, credits_included, features) VALUES
('free', 'Free Plan', 'Basic access with limited credits', 0, 0, 10, '["Basic market data", "5 AI insights per month"]'),
('basic', 'Basic Plan', 'Perfect for small businesses', 29.99, 299.99, 500, '["Full market data", "AI insights", "Export data", "Email support"]'),
('premium', 'Premium Plan', 'Advanced features for growing businesses', 79.99, 799.99, 2000, '["Everything in Basic", "Advanced AI analysis", "Custom reports", "Priority support", "API access"]'),
('enterprise', 'Enterprise Plan', 'Full access for large organizations', 199.99, 1999.99, 10000, '["Everything in Premium", "Unlimited AI insights", "Custom integrations", "Dedicated support", "White-label options"]');

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Users can view own transactions" ON credit_transactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all transactions" ON credit_transactions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Users can view own usage" ON api_usage FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all usage" ON api_usage FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Create functions for credit management
CREATE OR REPLACE FUNCTION deduct_credits(user_uuid UUID, credit_amount INTEGER, description_text TEXT DEFAULT 'API Usage')
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits INTO current_credits FROM user_profiles WHERE id = user_uuid;
  
  -- Check if user has enough credits
  IF current_credits >= credit_amount THEN
    -- Deduct credits
    UPDATE user_profiles SET credits = credits - credit_amount WHERE id = user_uuid;
    
    -- Log transaction
    INSERT INTO credit_transactions (user_id, transaction_type, amount, description)
    VALUES (user_uuid, 'usage', -credit_amount, description_text);
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to add credits
CREATE OR REPLACE FUNCTION add_credits(user_uuid UUID, credit_amount INTEGER, description_text TEXT, admin_uuid UUID DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
  -- Add credits
  UPDATE user_profiles SET credits = credits + credit_amount WHERE id = user_uuid;
  
  -- Log transaction
  INSERT INTO credit_transactions (user_id, transaction_type, amount, description, created_by)
  VALUES (user_uuid, 'admin_grant', credit_amount, description_text, admin_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
