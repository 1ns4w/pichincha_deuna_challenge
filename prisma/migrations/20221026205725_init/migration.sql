-- CreateTable
CREATE TABLE "Organization" (
    "id_organization" STRING NOT NULL,
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id_organization")
);

-- CreateTable
CREATE TABLE "Tribe" (
    "id_tribe" STRING NOT NULL,
    "name" CHAR(50) NOT NULL,
    "status" INT4 NOT NULL,
    "organizationId" STRING NOT NULL,

    CONSTRAINT "Tribe_pkey" PRIMARY KEY ("id_tribe")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id_repository" STRING NOT NULL,
    "name" CHAR(50) NOT NULL,
    "state" CHAR(1) NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" CHAR(1) NOT NULL,
    "tribeId" STRING NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id_repository")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id_metric" STRING NOT NULL,
    "coverage" FLOAT8 NOT NULL,
    "bugs" INT4 NOT NULL,
    "vulnerabilities" INT4 NOT NULL,
    "hotspot" INT4 NOT NULL,
    "code_smells" INT4 NOT NULL,
    "repositoryId" STRING NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id_metric")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metric_repositoryId_key" ON "Metric"("repositoryId");

-- AddForeignKey
ALTER TABLE "Tribe" ADD CONSTRAINT "Tribe_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id_organization") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe"("id_tribe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id_repository") ON DELETE RESTRICT ON UPDATE CASCADE;
