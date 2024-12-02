import mongoose from 'mongoose';

const lidhjaDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('U lidh me MongoDB me sukses!');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/forever`)
}

export default lidhjaDB;