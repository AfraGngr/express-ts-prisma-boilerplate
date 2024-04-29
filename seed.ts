/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    // Seed categories
    const categories = [
        { name: 'Classic Literature' },
        { name: 'Fantasy' },
        { name: 'Science Fiction' },
        { name: 'Dystopian' },
        { name: 'Historical' },
        { name: 'Romance' },
        { name: 'Horror' },
        { name: 'Thriller' },
    ];

    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true, // This prevents issues if the script is run multiple times
    });

    // Book data with categoryId
    const bookData = [
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            summary:
                'A novel about the experiences of racism and moral growth in the American South during the Great Depression.',
            borrowed: false,
            categoryId: 1,
        },
        {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            summary:
                'A fantasy novel that follows the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by the dragon, Smaug.',
            borrowed: true,
            categoryId: 2,
        },
        {
            title: '1984',
            author: 'George Orwell',
            summary:
                'A dystopian novel depicting life under a totalitarian regime that practices extreme surveillance.',
            borrowed: true,
            categoryId: 4,
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            summary:
                'A romantic novel of manners that explores the issues of morality, education, and marriage in the society of the landed gentry of early 19th-century England.',
            borrowed: false,
            categoryId: 6,
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            summary:
                'A tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.',
            borrowed: true,
            categoryId: 1,
        },
        {
            title: 'Moby Dick',
            author: 'Herman Melville',
            summary:
                'An epic tale of the voyage of the whaling ship Pequod, commanded by Captain Ahab, who leads his crew on a quest for the white whale, Moby-Dick.',
            borrowed: false,
            categoryId: 1,
        },
        {
            title: 'War and Peace',
            author: 'Leo Tolstoy',
            summary:
                'A complex Russian novel that follows the lives of four aristocratic families and integrates philosophical discussions with a narrative of the Napoleonic Wars.',
            borrowed: true,
            categoryId: 5,
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            summary:
                'A novel about a teenager’s angst and alienation following his expulsion from prep school.',
            borrowed: false,
            categoryId: 1,
        },
        {
            title: 'The Diary of a Young Girl',
            author: 'Anne Frank',
            summary:
                'The writings from the Dutch language diary kept by Anne Frank while she was in hiding with her family during the Nazi occupation of the Netherlands.',
            borrowed: false,
            categoryId: 5,
        },
        {
            title: "Harry Potter and the Sorcerer's Stone",
            author: 'J.K. Rowling',
            summary:
                'The first book in the Harry Potter series that introduces young wizard Harry Potter and his adventures at Hogwarts School of Witchcraft and Wizardry.',
            borrowed: true,
            categoryId: 2,
        },
        {
            title: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            summary:
                'An epic high fantasy novel that follows hobbits, elves, and men battling against the dark lord Sauron to prevent his obtaining the One Ring, which grants him the power to control Middle-earth.',
            borrowed: false,
            categoryId: 2,
        },
        {
            title: 'The Grapes of Wrath',
            author: 'John Steinbeck',
            summary:
                'The story follows the fortunes of a poor family as they travel from the Dust Bowl region to California during the Great Depression.',
            borrowed: true,
            categoryId: 5,
        },
        {
            title: 'Brave New World',
            author: 'Aldous Huxley',
            summary:
                'A dystopian novel which anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that combine profoundly to change society.',
            borrowed: false,
            categoryId: 4,
        },
        {
            title: 'Crime and Punishment',
            author: 'Fyodor Dostoevsky',
            summary:
                'A Russian novel that explores the moral dilemmas faced by Rodion Raskolnikov, a poor ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money.',
            borrowed: true,
            categoryId: 1,
        },
        {
            title: 'Catch-22',
            author: 'Joseph Heller',
            summary:
                'A satirical war novel that explores the absurdities of war and military life through the experiences of Captain John Yossarian, a U.S. Army Air Forces B-25 bombardier.',
            borrowed: false,
            categoryId: 8,
        },
        {
            title: 'Lolita',
            author: 'Vladimir Nabokov',
            summary:
                'A novel about the controversial obsession of Humbert Humbert, a literature professor in his late thirties, with Dolores Haze, a twelve-year-old girl.',
            borrowed: true,
            categoryId: 1,
        },
        {
            title: 'Jane Eyre',
            author: 'Charlotte Brontë',
            summary:
                'The novel follows the emotions and experiences of its title character, including her growth to adulthood and her love for Mr. Rochester, the brooding master of Thornfield Hall.',
            borrowed: false,
            categoryId: 6,
        },
        {
            title: 'The Adventures of Huckleberry Finn',
            author: 'Mark Twain',
            summary:
                'A novel about the journey of Huck Finn and a runaway slave, Jim, down the Mississippi River on a raft.',
            borrowed: true,
            categoryId: 5,
        },
        {
            title: 'Fahrenheit 451',
            author: 'Ray Bradbury',
            summary:
                "A dystopian novel that presents a future American society where books are outlawed and 'firemen' burn any that are found.",
            borrowed: false,
            categoryId: 4,
        },
        {
            title: 'Anna Karenina',
            author: 'Leo Tolstoy',
            summary:
                'A novel about the tragic love affair between Anna, a beautiful married woman, and Count Vronsky, a wealthy army officer.',
            borrowed: true,
            categoryId: 6,
        },
        {
            title: 'The Chronicles of Narnia',
            author: 'C.S. Lewis',
            summary:
                'A series of seven fantasy novels that revolve around the adventures of children in the magical realm of Narnia, guided by Aslan, a wise and powerful lion.',
            borrowed: false,
            categoryId: 2,
        },
        {
            title: 'Don Quixote',
            author: 'Miguel de Cervantes',
            summary:
                'A Spanish novel about the adventures of a noble (hidalgo) from La Mancha named Alonso Quixano, who reads so many chivalric romances that he decides to become a knight-errant himself.',
            borrowed: true,
            categoryId: 1,
        },
        {
            title: 'A Tale of Two Cities',
            author: 'Charles Dickens',
            summary:
                'A historical novel set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris and his release to live in London with his daughter Lucie.',
            borrowed: false,
            categoryId: 5,
        },
        {
            title: 'The Kite Runner',
            author: 'Khaled Hosseini',
            summary:
                "A novel about the unlikely friendship between a wealthy boy and the son of his father's servant, set against the backdrop of a country that is in the process of being destroyed.",
            borrowed: true,
            categoryId: 5,
        },
        {
            title: 'The Alchemist',
            author: 'Paulo Coelho',
            summary:
                'A philosophical book that follows the journey of an Andalusian shepherd boy named Santiago who dreams of discovering a worldly treasure located somewhere in Egypt.',
            borrowed: false,
            categoryId: 3,
        },
    ];

    // Ensuring the sequence will be sufficient after seeding books
    await prisma.$executeRawUnsafe(
        'ALTER SEQUENCE books_id_seq RESTART WITH 31;',
    );
    await prisma.$executeRawUnsafe(
        'ALTER SEQUENCE categories_id_seq RESTART WITH 9;',
    );

    // Use prisma to create each book entry
    for (const book of bookData) {
        await prisma.book.create({
            data: book,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
