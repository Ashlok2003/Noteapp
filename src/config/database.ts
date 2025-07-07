import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || '',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions,
    );
    console.log(
      `MongoDB Connected: ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
