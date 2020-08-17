require('../../config/env').loadEnvironment();
const { connectDB } = require('../../config/db');
const Kindergarten = require('../../src/models/kindergarten');
const createKindergartenMock = require('../mocks/kindergarten.mock');

describe('Kindergarten model', () => {
    let connection;

    beforeAll(async () => {
        connection = await connectDB();
    });

    afterAll(async () => {
        await connection.disconnect();
    });

    afterEach( async () => {
        await Kindergarten.deleteMany({});
    });

    describe('Save kindergarten', () => {
        it('should save with valid data', async (done) => {
            const kindergarten = new Kindergarten(createKindergartenMock());

            const insertedKindergarten = await kindergarten.save();

            const kindergartenFromDB = await Kindergarten.findById(insertedKindergarten._id);
            expect(kindergartenFromDB).not.toBeNull();

            done();
        });

        it('should not save with missing required fields', async (done) => {
            const data = createKindergartenMock();

            const requiredRootFields = ['name', 'fullName'];

            requiredRootFields.forEach((field) => {
                const value = data[field];
                data[field] = undefined;
                const kindergarten = new Kindergarten(data);

                expect(checkForError(kindergarten)).not.toBeNull();

                data[field] = value;
            });



            done();
        });

        it('should not save with missing name', async (done) => {
            const data = createKindergartenMock({ name: undefined });
            const kindergarten = new Kindergarten(data);

            expect(checkForError(kindergarten)).not.toBeNull();

            done();
        });

        it('should not save with duplicate names', async (done) => {
            const data = createKindergartenMock();
            const kindergarten = new Kindergarten(data);
            await kindergarten.save();

            const kindergartenDuplicate = new Kindergarten(data);
            const error = await checkForError(kindergartenDuplicate, kindergartenDuplicate.save);

            expect(error).not.toBeNull();

            done();
        });

        // full name
        it('should not save with full name longer then 150 characters', async (done) => {
            const data = createKindergartenMock({ fullName: 's'.repeat(151) });
            const kindergarten = new Kindergarten(data);

            const error = await checkForError(kindergarten, kindergarten.save);

            expect(error).not.toBeNull();

            done();
        });

        it('should trim full name before saving', async (done) => {
            const fullName = 'PU Bubamarica';
            const data = createKindergartenMock({ fullName: `      ${fullName}      ` });
            const kindergarten = new Kindergarten(data);
            await kindergarten.save();

            const savedKindergarten = await Kindergarten.findById(kindergarten._id);
            expect(savedKindergarten.fullName).toEqual(fullName);

            done();
        });

        // description
        it('should not save kindergarten docs with description longer then 500 characters', async (done) => {
            const data = createKindergartenMock({ description: 's'.repeat(501) });
            const kindergarten = new Kindergarten(data);

            const error = await checkForError(kindergarten, kindergarten.save);

            expect(error).not.toBeNull();

            done();
        });

        // goal
        it('should not save kindergarten docs with goal longer then 500 characters', async (done) => {
            const data = createKindergartenMock({ description: 's'.repeat(501) });
            const kindergarten = new Kindergarten(data);

            const error = await checkForError(kindergarten, kindergarten.save);

            expect(error).not.toBeNull();

            done();
        });

        // email
        it('should not save with invalid email', async (done) => {
            const data = createKindergartenMock();

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
                const kindergarten = new Kindergarten(invalidData);

                const error = await checkForError(kindergarten, kindergarten.save);
                expect(error).not.toBeNull();
            }

            done();
        });

        // locations
        it('should not save with empty locations', async (done) => {
            const data = createKindergartenMock({ locations: [] });
            const kindergarten = new Kindergarten(data);

            const error = await checkForError(kindergarten, kindergarten);
            expect(error).not.toBeNull();

            done();
        });

    });
});

const checkForError = async (model, method) => {
    let error = null;

    try { await method.call(model) }
    catch (e) { error = e }

    return error;
};

