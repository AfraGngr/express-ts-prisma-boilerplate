/* eslint-disable no-console */
import { app } from './app';

process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    /* eslint-disable */
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason: Error) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(reason.name, reason.message, reason.stack);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    // db.close()
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT RECEIVED. Shutting down gracefully');
    // db.close()
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
