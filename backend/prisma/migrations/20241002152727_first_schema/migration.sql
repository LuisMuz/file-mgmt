-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type_user" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileUser" (
    "id_file_user" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "path_server" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FileUser_pkey" PRIMARY KEY ("id_file_user")
);

-- CreateTable
CREATE TABLE "Project" (
    "id_project" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id_project")
);

-- CreateTable
CREATE TABLE "LinkProject" (
    "id" SERIAL NOT NULL,
    "id_file_user" INTEGER NOT NULL,
    "id_project" INTEGER NOT NULL,

    CONSTRAINT "LinkProject_pkey" PRIMARY KEY ("id")
);
