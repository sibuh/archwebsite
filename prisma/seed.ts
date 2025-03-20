const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();


async function main() {
    const adminExists = await prisma.user.findUnique({
        where: { email: "abel@gmail.com" },
    });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.user.create({
            data: {
                first_name:"abel",
                last_name:"tilahun",
                email: "abel@example.com",
                password: hashedPassword,
                phone:"251918171615",
                role: "ADMIN",
            },
        });
        console.log("Admin user seeded.");
    }
}

main().catch((e) => {
        console.error(e);
    })
    
