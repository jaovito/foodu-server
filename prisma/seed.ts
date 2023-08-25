import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const testerId = '56abb886-d461-481c-98cf-146845f89c7d';
  const passwordTest = '123456';

  const encryptedPassword = await bcrypt.hash(
    passwordTest,
    Number(process.env.HASH_PASSWORD),
  );

  const testUser = await prisma.user.upsert({
    where: { id: testerId },
    update: {
      id: testerId,
      email: 'test@gmail.com',
      name: 'test',
      password: encryptedPassword,
      cel: '123456789',
      latitude: 32.847668,
      longitude: -96.748131,
    },
    create: {
      id: testerId,
      email: 'test@gmail.com',
      name: 'test',
      password: encryptedPassword,
      cel: '123456789',
      latitude: 32.847668,
      longitude: -96.748131,
    },
  });

  const restaurantId = '4fa4bb89-1730-47ad-ae6a-3031c1c6907b';

  const restaurant = await prisma.restaurant.upsert({
    where: { id: restaurantId },
    update: {
      id: restaurantId,
      name: 'Route 66 Diner & Delights',
      about:
        'Relive the golden era of the 50s at RetroBite Diner, where juicy burgers and creamy milkshakes take you on a journey back in time. Vintage decor and classic flavors come together for an authentic and flavorful experience.',
      address: '264 Bleecker St',
      city: 'New York',
      neighbourhood: 'Brooklyn',
      uf: 'NY',
      latitude: 40.6990804,
      longitude: -96.748131,
    },
    create: {
      id: restaurantId,
      name: 'Route 66 Diner & Delights',
      about:
        'Relive the golden era of the 50s at RetroBite Diner, where juicy burgers and creamy milkshakes take you on a journey back in time. Vintage decor and classic flavors come together for an authentic and flavorful experience.',
      address: '264 Bleecker St',
      city: 'New York',
      neighbourhood: 'Brooklyn',
      uf: 'NY',
      latitude: 40.6990804,
      longitude: -73.9175635,
    },
  });

  const foodId = '6b0dc192-1bed-454c-83bb-70833e03cd51';
  const fileId = '48c29bd2-26b9-46c6-8792-b70a90ff2d3f';

  const file = await prisma.file.upsert({
    where: { id: fileId },
    update: {
      id: fileId,
      file_key: 'file_key',
      file_url:
        'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    create: {
      id: fileId,
      file_key: 'file_key',
      file_url:
        'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  });

  const food = await prisma.food.upsert({
    where: { id: foodId },
    update: {
      id: foodId,
      name: `Time Traveler's Delight`,
      about: `Indulge in the nostalgia with our "Time Traveler's Delight" at RetroBite Diner. This scrumptious creation features a perfectly grilled quarter-pound beef patty topped with melted American cheese, crispy bacon, and caramelized onions, all sandwiched between a toasted brioche bun. Served with a side of hand-cut fries and a classic chocolate malt milkshake, it's a taste of the past that's simply delightful.`,
      price: 10,
      energy: '500Kcal',
      size: 'BIG',
      restaurant_id: restaurant.id,
      file_id: file.id,
    },
    create: {
      id: foodId,
      name: `Time Traveler's Delight`,
      about: `Indulge in the nostalgia with our "Time Traveler's Delight" at RetroBite Diner. This scrumptious creation features a perfectly grilled quarter-pound beef patty topped with melted American cheese, crispy bacon, and caramelized onions, all sandwiched between a toasted brioche bun. Served with a side of hand-cut fries and a classic chocolate malt milkshake, it's a taste of the past that's simply delightful.`,
      price: 10,
      energy: '500Kcal',
      size: 'BIG',
      restaurant_id: restaurant.id,
      file_id: file.id,
    },
  });

  console.log({ testUser, restaurant, food, file });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
