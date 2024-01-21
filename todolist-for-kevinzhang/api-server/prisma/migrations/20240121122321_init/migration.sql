-- CreateTable
CREATE TABLE "TodoItem" (
    "id" TEXT NOT NULL,
    "taskListID" TEXT,
    "title" TEXT,
    "start" TIMESTAMP(3),
    "due" TIMESTAMP(3),
    "description" TEXT,
    "parentID" TEXT,
    "isCompleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUID" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedByUID" TEXT NOT NULL,

    CONSTRAINT "TodoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "todoItemID" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdByUID" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "todoItemID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdByUID" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "nickname" TEXT,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "_Owners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Followers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_Owners_AB_unique" ON "_Owners"("A", "B");

-- CreateIndex
CREATE INDEX "_Owners_B_index" ON "_Owners"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Followers_AB_unique" ON "_Followers"("A", "B");

-- CreateIndex
CREATE INDEX "_Followers_B_index" ON "_Followers"("B");

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_taskListID_fkey" FOREIGN KEY ("taskListID") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "TodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_createdByUID_fkey" FOREIGN KEY ("createdByUID") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_updatedByUID_fkey" FOREIGN KEY ("updatedByUID") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_todoItemID_fkey" FOREIGN KEY ("todoItemID") REFERENCES "TodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdByUID_fkey" FOREIGN KEY ("createdByUID") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_todoItemID_fkey" FOREIGN KEY ("todoItemID") REFERENCES "TodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_createdByUID_fkey" FOREIGN KEY ("createdByUID") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Owners" ADD CONSTRAINT "_Owners_A_fkey" FOREIGN KEY ("A") REFERENCES "TodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Owners" ADD CONSTRAINT "_Owners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_A_fkey" FOREIGN KEY ("A") REFERENCES "TodoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- data migration
INSERT INTO public."User" (uid, username, email, nickname, "hashedPassword") VALUES ('d05a7576-ecc1-48da-a75b-636a6c414b66', 'user', null, null, '$2b$10$zZPOFFJ60pvGmqX4VmntI.A6RJEoz8.Ljt9Skmd7IaYur4N7c9XOm');
INSERT INTO public."TodoItem" (id, "taskListID", title, start, due, description, "parentID", "isCompleted", "createdAt", "createdByUID", "updatedAt", "updatedByUID") VALUES ('5db2f89f-b323-45e3-b7f5-4123a02516f7', null, 'balab', null, null, null, null, false, '2024-01-17 09:59:33.218', 'd05a7576-ecc1-48da-a75b-636a6c414b66', '2024-01-17 09:59:33.218', 'd05a7576-ecc1-48da-a75b-636a6c414b66');
INSERT INTO public."TodoItem" (id, "taskListID", title, start, due, description, "parentID", "isCompleted", "createdAt", "createdByUID", "updatedAt", "updatedByUID") VALUES ('50704e39-76a5-4a99-a4be-429c9e031e2c', null, 'aha', null, null, null, null, false, '2024-01-17 10:00:14.687', 'd05a7576-ecc1-48da-a75b-636a6c414b66', '2024-01-17 10:00:14.687', 'd05a7576-ecc1-48da-a75b-636a6c414b66');
INSERT INTO public."Comment" (id, "todoItemID", content, "createdAt", "createdByUID") VALUES ('1c467635-80b3-4441-a12a-b015bf89d64f', '50704e39-76a5-4a99-a4be-429c9e031e2c', 'comment2', '2024-01-17 10:00:14.687', 'd05a7576-ecc1-48da-a75b-636a6c414b66');
INSERT INTO public."Comment" (id, "todoItemID", content, "createdAt", "createdByUID") VALUES ('a776341f-78e4-42ea-9a5f-d78f67bf177a', '50704e39-76a5-4a99-a4be-429c9e031e2c', 'comment1', '2024-01-17 10:00:14.687', 'd05a7576-ecc1-48da-a75b-636a6c414b66');
