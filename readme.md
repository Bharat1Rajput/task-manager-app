Pre-save Hook to Hash Password

`UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});`

🔹 How it works:
This Mongoose middleware (pre('save')) runs before saving the document to MongoDB.
Purpose: Hash the password before storing it in the database.


❌ Where NOT to Use It?
When Fetching Users: The password is already hashed, so there’s no need to hash it again.
When Using findOneAndUpdate or updateOne: These methods bypass Mongoose middlewares like pre('save'). You have to hash the password manually.



