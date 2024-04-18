import db, { getId } from "../../src/modules/db";

const run = async () => {
  await db.submission.createMany({
    data: [
      {
        id: getId(),
        data: {
          name: "Honey",
          instagram: "Your_honey_09",
        },
        submittedAt: new Date(),
      },
    ],
  });
};

// Auto-run if main script (not imported)
if (require.main === module) {
  run().then(() => {
    console.log("Data seed complete");
    process.exit();
  });
}
