CREATE TYPE "public"."todo_status" AS ENUM('waiting', 'started', 'pending', 'completed');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "status" "todo_status" DEFAULT 'waiting' NOT NULL;