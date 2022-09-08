## MongoDB and Mongoose Exercise

### Comparison Operators $
- eq (equal)
- ne (not equal)
- gt (greater than)
- gte (greater than or equal to)
- lt (less than)
- lte (less than or equal to)
- in 
- nin (not in)

### Logical Operators
- or
- and
- not
- nor

### Regular Expressions
 ```.find({ price: { $gt: 10} })``

- Syntax for representing regular expression => {pattern}
    - caret character to represent a string that starts with something
Example:
```.find({ author: /pattern/})```

 - Dollar sign in Regex indicates the end of the string
 Example:
```.find({ author: /Hamedani$/i }) ```
    - appending an 'i' in the end makes it case insensitive

- ```.*``` in Regex means we can have zero or more characters
Example:
```.find({ author: /.*Mosh.*/})```


#### Use this command to import data into mongo database 
```mongoimport --db [nameOfDatabase] --collection courses --file [jsonFile] ```
