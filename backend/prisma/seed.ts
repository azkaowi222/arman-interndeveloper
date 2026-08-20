import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  try {
    const hashedPasswordUser = await bcrypt.hash("123456", 10);
    await prisma.user.create({
      data: {
        name: "user",
        email: "user@gmail.com",
        password: hashedPasswordUser,
        role: "JOB_SEEKER",
      },
    });
    const hashedPasswordJobSeeker = await bcrypt.hash("jobseeker", 10);
    await prisma.user.create({
      data: {
        name: "jobseeker",
        email: "jobseeker@gmail.com",
        password: hashedPasswordJobSeeker,
        role: "JOB_SEEKER",
      },
    });

    console.log("user jobseeker berhasil dibuat");

    const hashedPasswordCompany = await bcrypt.hash("company", 10);
    const companieUser = await prisma.user.create({
      data: {
        name: "company",
        email: "company@gmail.com",
        password: hashedPasswordCompany,
        role: "COMPANY",
      },
    });
    console.log("user company berhasil dibuat");

    const companie = await prisma.company.create({
      data: {
        companyName: "PT. INDONESIA MAJU",
        description: "Memakmurkan dan mensejahterakan bangsa indonesia",
        location: "Tangerang, Banten",
        userId: companieUser.id,
      },
    });

    console.log(`companie ${companie.companyName} berhasil dibuat`);
  } catch (error) {
    console.log({
      error:
        error instanceof Error ? error.message : "Terjadi kesalahn pada server",
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
