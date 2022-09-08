const mongoose = require('mongoose');

// Connect method which returns a promise
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...' + err));


// SCHEMA
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 255,
        // match: /pattern/                 this is a built in validator for strings for using RegEx
    }, 
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true,
    },       // only meaningful in mongoose
    author:String,
    tags: {
        type: Array,
        validate: { 
            isAsync: true,                // Custom Validator
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number, 
        required: function() { return this.isPublished},
        min: 10,            // validators for numbers
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

// Classes (blueprint), object (instance of a class)
// Course, nodeCourse

// Once we have a schema, compile it into a model

// This is a class (uppercase first letter)
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // This document maps to a document in a MongoDB
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],                             // if we dont set this property, mongoose will initialized this as an empty array
        isPublished: true,
        price : 15.8
    });
    
    try {
        // course.validate();                           // returns a promise of void
        // When using await, code should be inside async function
        const result = await course.save();                // this method returns a promise
        console.log(result);
    }
    catch (ex) {
        // console.log(ex.message);
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

// Introducing filtering methods
async function getCourses(){
    // const pageNumber = 2;
    // const pageSize = 10;

    const courses = await Course                        // find method returns a Document.query which is like a promise
        .find({ author: 'Mosh', isPublished: true})
        // .or([ { author: 'Mosh' }, { isPublished: true } ])
        // .skip((pageNumber - 1) * pageSize)              // get the documents at a given page using skip and limit methods                            // used to implement pagination
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })                   // Filter documents
        // .count();                                     // count documents
    console.log(courses);
}

// Updating a course
async function updateCourse(id) {
    // update method is deprecated
    const result = await Course.findByIdAndUpdate( id , {
        $set: {
            author: 'Mosh',
            isPublished: false,
        }
    }, { new: true });

    // if (!course) return;
    //     course.isPublished = true;
    //     course.author = 'Another author';
    
    // const result = await course.save();
    console.log(result);
}

// Deleting a course
async function removeCourse(id) {
    // deleteMany method for deleting multiple documents
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// removeCourse('6316eed9256f2ef350dc7644');

createCourse();