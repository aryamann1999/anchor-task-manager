/*
  Warnings:

  - A unique constraint covering the columns `[userId,habitName]` on the table `Habit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Habit_userId_habitName_key" ON "Habit"("userId", "habitName");
