require('../../config/env').loadEnvironment();
const { connectDB } = require('../../config/db');
const User = require('../../src/models/user');
const createUserMock = require('../mocks/user.mock');

describe('User model', () => {
    let connection;

    beforeAll(async () => {
        connection = await connectDB();
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    afterEach( async () => {
        await User.deleteMany({});
    });

    describe('Save user', () => {
        it('should save with valid data', async (done) => {
            const user = new User(createUserMock());

            const insertedUser = await user.save();

            const userFromDB = await User.findById(insertedUser._id);
            expect(userFromDB).not.toBeNull();

            done();
        });

        it('should not save with missing required fields', async (done) => {
            const data = createUserMock();

            const requiredRootFields = ['username', 'password', 'email'];

            requiredRootFields.forEach((field) => {
                const value = data[field];
                data[field] = undefined;
                const user = new User(data);

                expect(checkForError(user)).not.toBeNull();

                data[field] = value;
            });

            done();
        });

        // username
        it('should not save with duplicate usernames', async (done) => {
            const data = createUserMock();
            const user = new User(data);
            await user.save();

            const userDuplicate = new User(data);
            const error = await checkForError(userDuplicate, userDuplicate.save);

            expect(error).not.toBeNull();

            done();
        });

        it('should trim username before saving', async (done) => {
            const username = 'iskra19';
            const data = createUserMock({ username: `      ${username}      ` });
            const user = new User(data);
            await user.save();

            const savedUser = await User.findById(user._id);
            expect(savedUser.username).toEqual(username);

            done();
        });

        // email
        it('should not save with invalid email', async (done) => {
            const data = createUserMock();

            const invalidEmails = [
                "plainaddress",
                "#@%^%#$@#$@#.com",
                "@example.com",
                "email.example.com",
                "email@example@example.com",
                ".email@example.com",
                "email.@example.com",
                "email..email@example.com",
                "email@example.com (Joe Smith)",
                "email@example",
                "email@-example.com",
                "email@111.222.333.44444",
                "email@example..com",
                "Abc..123@example.com"
            ];

            for await (const invalidEmail of invalidEmails) {
                const invalidData = { ...data, ...{ email: invalidEmail } };
                const user = new User(invalidData);

                const error = await checkForError(user, user.save);
                expect(error).not.toBeNull();
            }

            done();
        });
    });

    describe('Find user', () => {
        it('should return user when credentials are provided', async (done) => {
            const user = new User(createUserMock());

            await user.save();

            const userFromDB = await User.findByCredentials(user.username, user.password);
            expect(userFromDB).not.toBeNull();

            done();
        })
    });
});

const checkForError = async (model, method) => {
    let error = null;

    try { await method.call(model) }
    catch (e) { error = e }

    return error;
};
