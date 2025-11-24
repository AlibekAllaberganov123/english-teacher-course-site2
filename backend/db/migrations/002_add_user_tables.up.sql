ALTER TABLE contacts ADD COLUMN user_id TEXT;

CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id BIGINT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  title_uz TEXT NOT NULL,
  description TEXT,
  description_uz TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE homework (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL,
  title TEXT NOT NULL,
  title_uz TEXT NOT NULL,
  description TEXT NOT NULL,
  description_uz TEXT NOT NULL,
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE homework_submissions (
  id BIGSERIAL PRIMARY KEY,
  homework_id BIGINT NOT NULL REFERENCES homework(id),
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  grade INTEGER,
  feedback TEXT,
  UNIQUE(homework_id, user_id)
);

CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  course_id BIGINT NOT NULL,
  completed_videos INTEGER NOT NULL DEFAULT 0,
  total_videos INTEGER NOT NULL DEFAULT 0,
  completed_homework INTEGER NOT NULL DEFAULT 0,
  total_homework INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, course_id)
);

CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO admin_users (email, password_hash) VALUES
('admin@alibek.uz', '$2a$10$X1YQMYdN8Z8g5Q5Q5Q5Q5eO5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5');
