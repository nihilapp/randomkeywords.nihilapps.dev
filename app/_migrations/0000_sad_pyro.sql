CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"status" "todo_status" DEFAULT 'waiting' NOT NULL
);
